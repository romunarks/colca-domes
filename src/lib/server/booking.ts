import type { SupabaseClient } from "@supabase/supabase-js";

export type AvailabilityInput = {
  checkInRaw: string;
  checkOutRaw: string;
  guests: number;
};

export type AvailabilityResult = {
  available: boolean;
  availableDomes: number;
  totalDomes: number;
  nightlyRate: number;
  nights: number;
  totalEstimate: number;
};

export type ValidationError = {
  ok: false;
  message: string;
  status: number;
};

export const isIsoDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);

export const toUtcDate = (dateRaw: string) => new Date(`${dateRaw}T00:00:00Z`);

export const getNights = (checkIn: Date, checkOut: Date) => {
  const msPerNight = 1000 * 60 * 60 * 24;
  return Math.ceil((checkOut.getTime() - checkIn.getTime()) / msPerNight);
};

export const validateAvailabilityInput = (input: AvailabilityInput): ValidationError | null => {
  const { checkInRaw, checkOutRaw } = input;

  if (!isIsoDate(checkInRaw) || !isIsoDate(checkOutRaw)) {
    return {
      ok: false,
      message: "Las fechas deben tener formato YYYY-MM-DD.",
      status: 400,
    };
  }

  const checkIn = toUtcDate(checkInRaw);
  const checkOut = toUtcDate(checkOutRaw);
  const nights = getNights(checkIn, checkOut);

  const today = new Date();
  const todayUtc = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

  if (checkIn < todayUtc) {
    return {
      ok: false,
      message: "La fecha de check-in no puede ser anterior a hoy.",
      status: 400,
    };
  }

  if (nights <= 0) {
    return {
      ok: false,
      message: "El check-out debe ser posterior al check-in.",
      status: 400,
    };
  }

  if (!Number.isFinite(input.guests) || input.guests < 1 || input.guests > 8) {
    return {
      ok: false,
      message: "La cantidad de huespedes debe estar entre 1 y 8.",
      status: 400,
    };
  }

  return null;
};

export const calculateEstimate = (guests: number, nights: number, baseRatePen: number) => {
  const guestsSurcharge = guests >= 3 ? 1.18 : 1;
  const nightlyRate = Math.round(baseRatePen * guestsSurcharge);
  return {
    nightlyRate,
    totalEstimate: nightlyRate * nights,
  };
};

export const checkAvailabilityInDb = async (
  supabase: SupabaseClient,
  params: {
    checkInRaw: string;
    checkOutRaw: string;
    guests: number;
    totalDomesFallback: number;
    baseRatePen: number;
  }
): Promise<AvailabilityResult> => {
  const { checkInRaw, checkOutRaw, guests, totalDomesFallback, baseRatePen } = params;

  // Overlap rule: existing.check_in < requested.checkOut AND existing.check_out > requested.checkIn
  const { data: reservations, error: reservationsError } = await supabase
    .from("reservations")
    .select("domes_booked")
    .in("status", ["pending", "confirmed"])
    .lt("check_in", checkOutRaw)
    .gt("check_out", checkInRaw);

  if (reservationsError) {
    throw new Error(`Failed to query reservations: ${reservationsError.message}`);
  }

  const occupiedDomes = (reservations ?? []).reduce((sum, row) => sum + Number(row.domes_booked ?? 0), 0);

  const { count: activeDomesCount, error: domesCountError } = await supabase
    .from("domes")
    .select("id", { count: "exact", head: true })
    .eq("active", true);

  if (domesCountError) {
    throw new Error(`Failed to query domes: ${domesCountError.message}`);
  }

  const totalDomes = activeDomesCount && activeDomesCount > 0 ? activeDomesCount : totalDomesFallback;
  const availableDomes = Math.max(0, totalDomes - occupiedDomes);

  const checkIn = toUtcDate(checkInRaw);
  const checkOut = toUtcDate(checkOutRaw);
  const nights = getNights(checkIn, checkOut);
  const pricing = calculateEstimate(guests, nights, baseRatePen);

  return {
    available: availableDomes > 0,
    availableDomes,
    totalDomes,
    nightlyRate: pricing.nightlyRate,
    nights,
    totalEstimate: pricing.totalEstimate,
  };
};

export const createBookingLead = async (
  supabase: SupabaseClient,
  payload: {
    fullName: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    notes: string | null;
    availabilitySnapshot: Record<string, unknown> | null;
  }
) => {
  const { data, error } = await supabase
    .from("booking_leads")
    .insert({
      full_name: payload.fullName,
      check_in: payload.checkIn,
      check_out: payload.checkOut,
      guests: payload.guests,
      notes: payload.notes,
      availability_snapshot: payload.availabilitySnapshot,
      source: "website",
      status: "new",
    })
    .select("id, created_at")
    .single();

  if (error) {
    throw new Error(`Failed to create booking lead: ${error.message}`);
  }

  return data;
};

