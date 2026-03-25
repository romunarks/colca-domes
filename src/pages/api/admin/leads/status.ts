import type { APIRoute } from "astro";
import { requireAdminAuth } from "../../../../lib/server/adminAuth";
import { updateBookingLeadStatus } from "../../../../lib/server/booking";
import { getSupabaseAdmin } from "../../../../lib/server/supabase";

type Payload = {
  leadId?: string;
  status?: "new" | "contacted" | "qualified" | "closed";
};

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

  const leadId = payload.leadId?.trim() ?? "";
  const status = payload.status ?? null;

  if (!leadId || !status) {
    return new Response(JSON.stringify({ ok: false, message: "leadId y status son obligatorios." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const supabase = getSupabaseAdmin();
    const updated = await updateBookingLeadStatus(supabase, { leadId, status });
    return new Response(JSON.stringify({ ok: true, lead: updated }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: error instanceof Error ? error.message : "No se pudo actualizar el lead.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

