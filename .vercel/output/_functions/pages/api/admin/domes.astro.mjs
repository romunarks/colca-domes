import { r as requireAdminAuth } from '../../../chunks/adminAuth_BIWm4ElA.mjs';
import { b as listActiveDomes } from '../../../chunks/booking__DvAXFC1.mjs';
import { g as getSupabaseAdmin } from '../../../chunks/supabase_BVy8tn3a.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ request }) => {
  const auth = requireAdminAuth(request);
  if (!auth.ok) return auth.response;
  try {
    const supabase = getSupabaseAdmin();
    const domes = await listActiveDomes(supabase);
    return new Response(JSON.stringify({ ok: true, domes }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ ok: false, message: error instanceof Error ? error.message : "No se pudieron listar domos." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
