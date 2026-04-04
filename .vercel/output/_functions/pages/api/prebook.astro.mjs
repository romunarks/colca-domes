import { randomUUID } from 'node:crypto';
import { v as validateAvailabilityInput, k as createBookingLead } from '../../chunks/booking__DvAXFC1.mjs';
import { t as tryGetSupabaseAdmin } from '../../chunks/supabase_BVy8tn3a.mjs';
export { renderers } from '../../renderers.mjs';

const sanitizeText = (value, maxLength) => value.trim().slice(0, maxLength);
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
  const fullName = sanitizeText(payload.fullName ?? "", 120);
  const checkInRaw = sanitizeText(payload.checkInRaw ?? "", 10);
  const checkOutRaw = sanitizeText(payload.checkOutRaw ?? "", 10);
  const guests = Number(payload.guests ?? 1);
  const notes = sanitizeText(payload.notes ?? "", 1e3);
  if (!fullName) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: "El nombre es obligatorio."
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  const validation = validateAvailabilityInput({ checkInRaw, checkOutRaw, guests });
  if (validation) {
    return new Response(JSON.stringify(validation), {
      status: validation.status,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const supabase = tryGetSupabaseAdmin();
    if (!supabase) {
      return new Response(
        JSON.stringify({
          ok: true,
          mode: "demo",
          leadId: `demo-${randomUUID()}`,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          message: "Modo demo: pre-reserva generada sin guardar en base de datos."
        }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    }
    const lead = await createBookingLead(supabase, {
      fullName,
      checkIn: checkInRaw,
      checkOut: checkOutRaw,
      guests,
      notes: notes || null,
      availabilitySnapshot: payload.availabilitySnapshot ?? null
    });
    return new Response(
      JSON.stringify({
        ok: true,
        leadId: lead.id,
        createdAt: lead.created_at,
        message: "Pre-reserva registrada correctamente."
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[prebook] Unexpected server error", error);
    return new Response(
      JSON.stringify({
        ok: true,
        mode: "demo",
        leadId: `demo-${randomUUID()}`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        message: "Modo demo: no se pudo guardar la pre-reserva en BD, pero puedes continuar por WhatsApp."
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
