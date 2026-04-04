import { r as requireAdminAuth } from '../../../../chunks/adminAuth_BIWm4ElA.mjs';
import { u as updateBookingLeadStatus } from '../../../../chunks/booking__DvAXFC1.mjs';
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
  const leadId = payload.leadId?.trim() ?? "";
  const status = payload.status ?? null;
  if (!leadId || !status) {
    return new Response(JSON.stringify({ ok: false, message: "leadId y status son obligatorios." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const supabase = getSupabaseAdmin();
    const updated = await updateBookingLeadStatus(supabase, { leadId, status });
    return new Response(JSON.stringify({ ok: true, lead: updated }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: error instanceof Error ? error.message : "No se pudo actualizar el lead."
      }),
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
