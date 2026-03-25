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

export type BookingLeadRow = {
  id: string;
  full_name: string;
  check_in: string;
  check_out: string;
  guests: number;
  status: "new" | "contacted" | "qualified" | "closed";
  source: string;
  notes: string | null;
  created_at: string;
  availability_snapshot: Record<string, unknown> | null;
};

export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export type ReservationRow = {
  id: string;
  lead_id: string | null;
  check_in: string;
  check_out: string;
  domes_booked: number;
  status: ReservationStatus;
  created_at: string;
};

export type DomeRow = {
  id: string;
  code: string;
  name: string;
  active: boolean;
};

export type ValidationError = {
  ok: false;
  message: string;
  status: number;
};

export const isIsoDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);

export const toUtcDate = (dateRaw: string) => new Date(`${dateRaw}T00:00:00Z`);
export const getTodayUtcStart = () => toUtcDate(new Date().toISOString().slice(0, 10));

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

  const todayUtc = getTodayUtcStart();

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

export const listRecentBookingLeads = async (supabase: SupabaseClient, limit = 50): Promise<BookingLeadRow[]> => {
  const { data, error } = await supabase
    .from("booking_leads")
    .select(
      "id, full_name, check_in, check_out, guests, status, source, notes, created_at, availability_snapshot"
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to list booking leads: ${error.message}`);
  }

  return (data ?? []) as BookingLeadRow[];
};

export const updateBookingLeadStatus = async (
  supabase: SupabaseClient,
  payload: { leadId: string; status: BookingLeadRow["status"] }
) => {
  const { data, error } = await supabase
    .from("booking_leads")
    .update({ status: payload.status })
    .eq("id", payload.leadId)
    .select("id, status")
    .single();

  if (error) {
    throw new Error(`Failed to update booking lead: ${error.message}`);
  }

  return data as { id: string; status: BookingLeadRow["status"] };
};

export const getBookingLeadById = async (supabase: SupabaseClient, leadId: string): Promise<BookingLeadRow> => {
  const { data, error } = await supabase
    .from("booking_leads")
    .select("id, full_name, check_in, check_out, guests, status, source, notes, created_at, availability_snapshot")
    .eq("id", leadId)
    .single();

  if (error) {
    throw new Error(`Failed to load booking lead: ${error.message}`);
  }

  return data as BookingLeadRow;
};

export const createReservation = async (
  supabase: SupabaseClient,
  payload: {
    leadId: string | null;
    checkIn: string;
    checkOut: string;
    domesBooked: number;
    status: ReservationStatus;
  }
) => {
  const withLeadId = await supabase
    .from("reservations")
    .insert({
      lead_id: payload.leadId,
      check_in: payload.checkIn,
      check_out: payload.checkOut,
      domes_booked: payload.domesBooked,
      status: payload.status,
    })
    .select("id, lead_id, check_in, check_out, domes_booked, status, created_at")
    .single();

  if (!withLeadId.error) {
    return withLeadId.data as ReservationRow;
  }

  // Backward-compatible: older schema may not have reservations.lead_id yet.
  const message = withLeadId.error.message ?? "";
  if (message.includes("lead_id")) {
    const withoutLeadId = await supabase
      .from("reservations")
      .insert({
        check_in: payload.checkIn,
        check_out: payload.checkOut,
        domes_booked: payload.domesBooked,
        status: payload.status,
      })
      .select("id, check_in, check_out, domes_booked, status, created_at")
      .single();

    if (withoutLeadId.error) {
      throw new Error(`Failed to create reservation: ${withoutLeadId.error.message}`);
    }

    return {
      ...(withoutLeadId.data as Omit<ReservationRow, "lead_id">),
      lead_id: null,
    } as ReservationRow;
  }

  throw new Error(`Failed to create reservation: ${withLeadId.error.message}`);
};

export const listUpcomingReservations = async (supabase: SupabaseClient, limit = 100): Promise<ReservationRow[]> => {
  const today = new Date().toISOString().slice(0, 10);
  const withLeadId = await supabase
    .from("reservations")
    .select("id, lead_id, check_in, check_out, domes_booked, status, created_at")
    .in("status", ["pending", "confirmed"])
    .gte("check_out", today)
    .order("check_in", { ascending: true })
    .limit(limit);

  if (!withLeadId.error) {
    return (withLeadId.data ?? []) as ReservationRow[];
  }

  // Backward-compatible: older schema may not have reservations.lead_id yet.
  const message = withLeadId.error.message ?? "";
  if (message.includes("lead_id")) {
    const withoutLeadId = await supabase
      .from("reservations")
      .select("id, check_in, check_out, domes_booked, status, created_at")
      .in("status", ["pending", "confirmed"])
      .gte("check_out", today)
      .order("check_in", { ascending: true })
      .limit(limit);

    if (withoutLeadId.error) {
      throw new Error(`Failed to list reservations: ${withoutLeadId.error.message}`);
    }

    return ((withoutLeadId.data ?? []) as Array<Omit<ReservationRow, "lead_id">>).map((row) => ({
      ...row,
      lead_id: null,
    })) as ReservationRow[];
  }

  throw new Error(`Failed to list reservations: ${withLeadId.error.message}`);
};

export const listActiveDomes = async (supabase: SupabaseClient): Promise<DomeRow[]> => {
  const { data, error } = await supabase.from("domes").select("id, code, name, active").eq("active", true).order("code");
  if (error) {
    throw new Error(`Failed to list domes: ${error.message}`);
  }
  return (data ?? []) as DomeRow[];
};

export const cancelReservation = async (supabase: SupabaseClient, reservationId: string) => {
  const { data, error } = await supabase
    .from("reservations")
    .update({ status: "cancelled" })
    .eq("id", reservationId)
    .select("id, status")
    .single();

  if (error) {
    throw new Error(`Failed to cancel reservation: ${error.message}`);
  }

  return data as { id: string; status: ReservationStatus };
};

export const deleteReservation = async (supabase: SupabaseClient, reservationId: string) => {
  const { error } = await supabase.from("reservations").delete().eq("id", reservationId);
  if (error) {
    throw new Error(`Failed to delete reservation: ${error.message}`);
  }
  return { id: reservationId };
};

export const assignReservationDomes = async (
  supabase: SupabaseClient,
  payload: { reservationId: string; domeCodes: string[] }
) => {
  const reservationId = payload.reservationId;
  const domeCodes = payload.domeCodes.map((c) => c.trim()).filter(Boolean);
  if (domeCodes.length === 0) {
    throw new Error("Debes enviar al menos un domo.");
  }

  const reservationRes = await supabase
    .from("reservations")
    .select("id, check_in, check_out, status")
    .eq("id", reservationId)
    .single();

  if (reservationRes.error || !reservationRes.data) {
    throw new Error(`Failed to load reservation: ${reservationRes.error?.message ?? "not found"}`);
  }

  const checkIn = String((reservationRes.data as any).check_in);
  const checkOut = String((reservationRes.data as any).check_out);

  // Resolve domes by code
  const domesRes = await supabase.from("domes").select("id, code, active").in("code", domeCodes).eq("active", true);
  if (domesRes.error) {
    throw new Error(`Failed to resolve domes: ${domesRes.error.message}`);
  }

  const resolved = (domesRes.data ?? []) as Array<{ id: string; code: string }>;
  if (resolved.length !== domeCodes.length) {
    const found = new Set(resolved.map((d) => d.code));
    const missing = domeCodes.filter((c) => !found.has(c));
    throw new Error(`Domos no encontrados/inactivos: ${missing.join(", ")}`);
  }

  const domeIds = resolved.map((d) => d.id);

  // Validate no conflicts for these domes in overlapping reservations
  // Overlap rule: existing.check_in < requested.checkOut AND existing.check_out > requested.checkIn
  const conflicts = await supabase
    .from("reservation_domes")
    .select("reservation_id, dome_id, reservations!inner(check_in, check_out, status)")
    .in("dome_id", domeIds)
    .neq("reservation_id", reservationId);

  if (conflicts.error) {
    const msg = conflicts.error.message ?? "";
    if (msg.includes("reservation_domes")) {
      throw new Error("Falta crear la tabla reservation_domes. Ejecuta `supabase/schema.sql` actualizado.");
    }
    throw new Error(`Failed to validate dome conflicts: ${conflicts.error.message}`);
  }

  const conflicting = (conflicts.data ?? []).filter((row: any) => {
    const r = row.reservations;
    if (!r) return false;
    if (r.status !== "pending" && r.status !== "confirmed") return false;
    return r.check_in < checkOut && r.check_out > checkIn;
  });

  if (conflicting.length > 0) {
    throw new Error("Uno o más domos ya están asignados a otra reserva en ese rango.");
  }

  // Replace assignments
  const del = await supabase.from("reservation_domes").delete().eq("reservation_id", reservationId);
  if (del.error) {
    throw new Error(`Failed to clear dome assignments: ${del.error.message}`);
  }

  const ins = await supabase
    .from("reservation_domes")
    .insert(domeIds.map((dome_id) => ({ reservation_id: reservationId, dome_id })));
  if (ins.error) {
    throw new Error(`Failed to assign domes: ${ins.error.message}`);
  }

  return { reservationId, domeCodes };
};

