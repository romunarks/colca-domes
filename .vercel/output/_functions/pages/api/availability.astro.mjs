import { v as validateAvailabilityInput, h as getNights, i as checkAvailabilityInDb, j as calculateEstimate, t as toUtcDate } from '../../chunks/booking__DvAXFC1.mjs';
import { a as getConfigNumber, t as tryGetSupabaseAdmin } from '../../chunks/supabase_BVy8tn3a.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return new Response(
      JSON.stringify({
        ok: false,
        message: "Solicitud invalida. Revisa el formato JSON."
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
      headers: { "Content-Type": "application/json" }
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
          message: "Modo demo: configura Supabase para disponibilidad real."
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    const availability = await checkAvailabilityInDb(supabase, {
      checkInRaw,
      checkOutRaw,
      guests,
      totalDomesFallback,
      baseRatePen
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
        message: availability.available ? "Tenemos disponibilidad para las fechas seleccionadas." : "Por ahora no hay domos disponibles en ese rango de fechas."
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
        message: "Modo demo: no se pudo consultar la BD. Ejecuta `supabase/schema.sql` y usa la service_role key."
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
