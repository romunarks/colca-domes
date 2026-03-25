import type { APIRoute } from "astro";
import {
  checkAvailabilityInDb,
  type AvailabilityInput,
  calculateEstimate,
  getNights,
  toUtcDate,
  validateAvailabilityInput,
} from "../../lib/server/booking";
import { getConfigNumber, tryGetSupabaseAdmin } from "../../lib/server/supabase";

type AvailabilityPayload = Partial<AvailabilityInput>;

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

  const checkInRaw = payload.checkInRaw?.trim() ?? "";
  const checkOutRaw = payload.checkOutRaw?.trim() ?? "";
  const guests = Number(payload.guests ?? 1);

  const validationError = validateAvailabilityInput({ checkInRaw, checkOutRaw, guests });
  if (validationError) {
    return new Response(JSON.stringify(validationError), {
      status: validationError.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const totalDomesFallback = getConfigNumber("TOTAL_DOMES", 6);
  const baseRatePen = getConfigNumber("BASE_RATE_PEN", 420);
  const nights = getNights(toUtcDate(checkInRaw), toUtcDate(checkOutRaw));
  const pricing = calculateEstimate(guests, nights, baseRatePen);

  try {
    const supabase = tryGetSupabaseAdmin();
    if (!supabase) {
      return new Response(
        JSON.stringify({
          ok: true,
          mode: "demo",
          available: true,
          availableDomes: totalDomesFallback,
          totalDomes: totalDomesFallback,
          currency: "PEN",
          nightlyRate: pricing.nightlyRate,
          nights,
          totalEstimate: pricing.totalEstimate,
          checkIn: checkInRaw,
          checkOut: checkOutRaw,
          message: "Modo demo: configura Supabase para disponibilidad real.",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const availability = await checkAvailabilityInDb(supabase, {
      checkInRaw,
      checkOutRaw,
      guests,
      totalDomesFallback,
      baseRatePen,
    });

    return new Response(
      JSON.stringify({
        ok: true,
        available: availability.available,
        availableDomes: availability.availableDomes,
        totalDomes: availability.totalDomes,
        currency: "PEN",
        nightlyRate: availability.nightlyRate,
        nights: availability.nights,
        totalEstimate: availability.totalEstimate,
        checkIn: checkInRaw,
        checkOut: checkOutRaw,
        message: availability.available
          ? "Tenemos disponibilidad para las fechas seleccionadas."
          : "Por ahora no hay domos disponibles en ese rango de fechas.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[availability] Unexpected server error", error);
    return new Response(
      JSON.stringify({
        ok: true,
        mode: "demo",
        available: true,
        availableDomes: totalDomesFallback,
        totalDomes: totalDomesFallback,
        currency: "PEN",
        nightlyRate: pricing.nightlyRate,
        nights,
        totalEstimate: pricing.totalEstimate,
        checkIn: checkInRaw,
        checkOut: checkOutRaw,
        message: "Modo demo: no se pudo consultar la BD. Ejecuta `supabase/schema.sql` y usa la service_role key.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
};

