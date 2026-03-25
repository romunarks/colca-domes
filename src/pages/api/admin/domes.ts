import type { APIRoute } from "astro";
import { requireAdminAuth } from "../../../lib/server/adminAuth";
import { listActiveDomes } from "../../../lib/server/booking";
import { getSupabaseAdmin } from "../../../lib/server/supabase";

export const GET: APIRoute = async ({ request }) => {
  const auth = requireAdminAuth(request);
  if (!auth.ok) return auth.response;

  try {
    const supabase = getSupabaseAdmin();
    const domes = await listActiveDomes(supabase);
    return new Response(JSON.stringify({ ok: true, domes }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ ok: false, message: error instanceof Error ? error.message : "No se pudieron listar domos." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

