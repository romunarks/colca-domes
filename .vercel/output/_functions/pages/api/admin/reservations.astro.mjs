import { r as requireAdminAuth } from '../../../chunks/adminAuth_BIWm4ElA.mjs';
import { a as listUpcomingReservations, g as getBookingLeadById, f as createReservation } from '../../../chunks/booking__DvAXFC1.mjs';
import { g as getSupabaseAdmin } from '../../../chunks/supabase_BVy8tn3a.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ request }) => {
  const auth = requireAdminAuth(request);
  if (!auth.ok) return auth.response;
  try {
    const supabase = getSupabaseAdmin();
    const reservations = await listUpcomingReservations(supabase, 150);
    const ids = reservations.map((r) => r.id);
    let assignedByReservationId = {};
    if (ids.length > 0) {
      const assignments = await supabase.from("reservation_domes").select("reservation_id, domes!inner(code)").in("reservation_id", ids);
      if (!assignments.error) {
        assignedByReservationId = (assignments.data ?? []).reduce((acc, row) => {
          const rid = String(row.reservation_id);
          const code = String(row.domes?.code ?? "");
          if (!acc[rid]) acc[rid] = [];
          if (code) acc[rid].push(code);
          return acc;
        }, {});
      }
    }
    const enriched = reservations.map((r) => ({
      ...r,
      assigned_domes: assignedByReservationId[r.id] ?? []
    }));
    return new Response(JSON.stringify({ ok: true, reservations: enriched }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ ok: false, message: error instanceof Error ? error.message : "No se pudieron listar reservas." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
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
  const status = payload.status ?? "confirmed";
  const domesBooked = Number(payload.domesBooked ?? 1);
  if (!leadId) {
    return new Response(JSON.stringify({ ok: false, message: "leadId es obligatorio." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  if (!Number.isFinite(domesBooked) || domesBooked < 1 || domesBooked > 20) {
    return new Response(JSON.stringify({ ok: false, message: "domesBooked invalido." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const supabase = getSupabaseAdmin();
    const lead = await getBookingLeadById(supabase, leadId);
    const reservation = await createReservation(supabase, {
      leadId: lead.id,
      checkIn: lead.check_in,
      checkOut: lead.check_out,
      domesBooked,
      status
    });
    return new Response(JSON.stringify({ ok: true, reservation }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ ok: false, message: error instanceof Error ? error.message : "No se pudo crear reserva." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
