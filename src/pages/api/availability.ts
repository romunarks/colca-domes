import type { APIRoute } from "astro";
import {
  checkAvailabilityInDb,
  type AvailabilityInput,
  validateAvailabilityInput,
} from "../../lib/server/booking";
import { getConfigNumber, getSupabaseAdmin } from "../../lib/server/supabase";

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

  try {
    const supabase = getSupabaseAdmin();
    const totalDomesFallback = getConfigNumber("TOTAL_DOMES", 6);
    const baseRatePen = getConfigNumber("BASE_RATE_PEN", 420);

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
    const message = error instanceof Error ? error.message : "Internal server error";
    return new Response(
      JSON.stringify({
        ok: false,
        message:
          "No se pudo consultar disponibilidad. Verifica SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en el servidor.",
        details: message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

