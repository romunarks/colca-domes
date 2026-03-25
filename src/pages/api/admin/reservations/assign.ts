import type { APIRoute } from "astro";
import { requireAdminAuth } from "../../../../lib/server/adminAuth";
import { assignReservationDomes } from "../../../../lib/server/booking";
import { getSupabaseAdmin } from "../../../../lib/server/supabase";

type Payload = { reservationId?: string; domeCodes?: string[] };

export const POST: APIRoute = async ({ request }) => {
  const auth = requireAdminAuth(request);
  if (!auth.ok) return auth.response;

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return new Response(JSON.stringify({ ok: false, message: "JSON invalido." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const reservationId = payload.reservationId?.trim() ?? "";
  const domeCodes = Array.isArray(payload.domeCodes) ? payload.domeCodes : [];

  if (!reservationId) {
    return new Response(JSON.stringify({ ok: false, message: "reservationId es obligatorio." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const supabase = getSupabaseAdmin();
    const result = await assignReservationDomes(supabase, { reservationId, domeCodes });
    return new Response(JSON.stringify({ ok: true, assignment: result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ ok: false, message: error instanceof Error ? error.message : "No se pudo asignar domos." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

