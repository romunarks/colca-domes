import { r as requireAdminAuth } from '../../../../chunks/adminAuth_BIWm4ElA.mjs';
import { e as deleteReservation } from '../../../../chunks/booking__DvAXFC1.mjs';
import { g as getSupabaseAdmin } from '../../../../chunks/supabase_BVy8tn3a.mjs';
export { renderers } from '../../../../renderers.mjs';

const POST = async ({ request }) => {
  const auth = requireAdminAuth(request);
  if (!auth.ok) return auth.response;
  let payload;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, message: "JSON invalido." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const reservationId = payload.reservationId?.trim() ?? "";
  if (!reservationId) {
    return new Response(JSON.stringify({ ok: false, message: "reservationId es obligatorio." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const supabase = getSupabaseAdmin();
    const deleted = await deleteReservation(supabase, reservationId);
    return new Response(JSON.stringify({ ok: true, reservation: deleted }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ ok: false, message: error instanceof Error ? error.message : "No se pudo borrar." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
