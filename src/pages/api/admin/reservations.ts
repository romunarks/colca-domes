import type { APIRoute } from "astro";
import { requireAdminAuth } from "../../../lib/server/adminAuth";
import { createReservation, getBookingLeadById, listUpcomingReservations, type ReservationStatus } from "../../../lib/server/booking";
import { getSupabaseAdmin } from "../../../lib/server/supabase";

type CreatePayload = {
  leadId?: string;
  status?: ReservationStatus;
  domesBooked?: number;
};

export const GET: APIRoute = async ({ request }) => {
  const auth = requireAdminAuth(request);
  if (!auth.ok) return auth.response;

  try {
    const supabase = getSupabaseAdmin();
    const reservations = await listUpcomingReservations(supabase, 150);

    // Try to enrich with assigned dome codes (if reservation_domes exists)
    const ids = reservations.map((r) => r.id);
    let assignedByReservationId: Record<string, string[]> = {};

    if (ids.length > 0) {
      const assignments = await supabase
        .from("reservation_domes")
        .select("reservation_id, domes!inner(code)")
        .in("reservation_id", ids);

      if (!assignments.error) {
        assignedByReservationId = (assignments.data ?? []).reduce((acc: any, row: any) => {
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
      assigned_domes: assignedByReservationId[r.id] ?? [],
    }));

    return new Response(JSON.stringify({ ok: true, reservations: enriched }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ ok: false, message: error instanceof Error ? error.message : "No se pudieron listar reservas." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  const auth = requireAdminAuth(request);
  if (!auth.ok) return auth.response;

  let payload: CreatePayload;
  try {
    payload = (await request.json()) as CreatePayload;
  } catch {
    return new Response(JSON.stringify({ ok: false, message: "JSON invalido." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const leadId = payload.leadId?.trim() ?? "";
  const status = payload.status ?? "confirmed";
  const domesBooked = Number(payload.domesBooked ?? 1);

  if (!leadId) {
    return new Response(JSON.stringify({ ok: false, message: "leadId es obligatorio." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!Number.isFinite(domesBooked) || domesBooked < 1 || domesBooked > 20) {
    return new Response(JSON.stringify({ ok: false, message: "domesBooked invalido." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
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
      status,
    });

    return new Response(JSON.stringify({ ok: true, reservation }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ ok: false, message: error instanceof Error ? error.message : "No se pudo crear reserva." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

