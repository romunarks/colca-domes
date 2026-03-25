import type { APIRoute } from "astro";
import { requireAdminAuth } from "../../../../lib/server/adminAuth";
import { deleteReservation } from "../../../../lib/server/booking";
import { getSupabaseAdmin } from "../../../../lib/server/supabase";

type Payload = { reservationId?: string };

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
  if (!reservationId) {
    return new Response(JSON.stringify({ ok: false, message: "reservationId es obligatorio." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const supabase = getSupabaseAdmin();
    const deleted = await deleteReservation(supabase, reservationId);
    return new Response(JSON.stringify({ ok: true, reservation: deleted }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ ok: false, message: error instanceof Error ? error.message : "No se pudo borrar." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

