import type { APIRoute } from "astro";

type AvailabilityPayload = {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
};

type BookingWindow = {
  checkIn: string;
  checkOut: string;
  domesBooked: number;
};

const TOTAL_DOMES = 6;
const BASE_RATE_PEN = 420;

// Placeholder data. In production this should come from your database.
const bookingWindows: BookingWindow[] = [
  { checkIn: "2026-02-12", checkOut: "2026-02-14", domesBooked: 2 },
  { checkIn: "2026-02-18", checkOut: "2026-02-21", domesBooked: 3 },
  { checkIn: "2026-03-05", checkOut: "2026-03-08", domesBooked: 4 },
];

const isIsoDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);

const datesOverlap = (startA: Date, endA: Date, startB: Date, endB: Date) => {
  return startA < endB && startB < endA;
};

const getNights = (checkIn: Date, checkOut: Date) => {
  const msPerNight = 1000 * 60 * 60 * 24;
  return Math.ceil((checkOut.getTime() - checkIn.getTime()) / msPerNight);
};

export const POST: APIRoute = async ({ request }) => {
  let payload: AvailabilityPayload;

  try {
    payload = (await request.json()) as AvailabilityPayload;
  } catch {
    return new Response(
      JSON.stringify({
        ok: false,
        message: "Solicitud invalida. Revisa el formato JSON.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const checkInRaw = payload.checkIn?.trim() ?? "";
  const checkOutRaw = payload.checkOut?.trim() ?? "";
  const guests = Number(payload.guests ?? 1);

  if (!isIsoDate(checkInRaw) || !isIsoDate(checkOutRaw)) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: "Las fechas deben tener formato YYYY-MM-DD.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const checkIn = new Date(`${checkInRaw}T00:00:00Z`);
  const checkOut = new Date(`${checkOutRaw}T00:00:00Z`);
  const today = new Date();
  const todayUtc = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const nights = getNights(checkIn, checkOut);

  if (checkIn < todayUtc) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: "La fecha de check-in no puede ser anterior a hoy.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (nights <= 0) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: "El check-out debe ser posterior al check-in.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const occupiedDomes = bookingWindows.reduce((acc, booking) => {
    const bookingStart = new Date(`${booking.checkIn}T00:00:00Z`);
    const bookingEnd = new Date(`${booking.checkOut}T00:00:00Z`);
    if (datesOverlap(checkIn, checkOut, bookingStart, bookingEnd)) {
      return acc + booking.domesBooked;
    }
    return acc;
  }, 0);

  const availableDomes = Math.max(0, TOTAL_DOMES - occupiedDomes);
  const available = availableDomes > 0;

  // Pricing can later be replaced by dynamic rules in DB.
  const guestsSurcharge = guests >= 3 ? 1.18 : 1;
  const nightlyRate = Math.round(BASE_RATE_PEN * guestsSurcharge);
  const totalEstimate = nightlyRate * nights;

  return new Response(
    JSON.stringify({
      ok: true,
      available,
      availableDomes,
      totalDomes: TOTAL_DOMES,
      currency: "PEN",
      nightlyRate,
      nights,
      totalEstimate,
      checkIn: checkInRaw,
      checkOut: checkOutRaw,
      message: available
        ? "Tenemos disponibilidad para las fechas seleccionadas."
        : "Por ahora no hay domos disponibles en ese rango de fechas.",
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};

