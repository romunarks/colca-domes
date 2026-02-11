import type { APIRoute } from "astro";
import { createBookingLead, type AvailabilityInput, validateAvailabilityInput } from "../../lib/server/booking";
import { getSupabaseAdmin } from "../../lib/server/supabase";

type PreBookPayload = {
  fullName?: string;
  checkInRaw?: string;
  checkOutRaw?: string;
  guests?: number;
  notes?: string;
  availabilitySnapshot?: Record<string, unknown>;
};

const sanitizeText = (value: string, maxLength: number) => value.trim().slice(0, maxLength);

export const POST: APIRoute = async ({ request }) => {
  let payload: PreBookPayload;

  try {
    payload = (await request.json()) as PreBookPayload;
  } catch {
    return new Response(
      JSON.stringify({
        ok: false,
        message: "Solicitud invalida. Revisa el formato JSON.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const fullName = sanitizeText(payload.fullName ?? "", 120);
  const checkInRaw = sanitizeText(payload.checkInRaw ?? "", 10);
  const checkOutRaw = sanitizeText(payload.checkOutRaw ?? "", 10);
  const guests = Number(payload.guests ?? 1);
  const notes = sanitizeText(payload.notes ?? "", 1000);

  if (!fullName) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: "El nombre es obligatorio.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const validation = validateAvailabilityInput({ checkInRaw, checkOutRaw, guests } satisfies AvailabilityInput);
  if (validation) {
    return new Response(JSON.stringify(validation), {
      status: validation.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const supabase = getSupabaseAdmin();
    const lead = await createBookingLead(supabase, {
      fullName,
      checkIn: checkInRaw,
      checkOut: checkOutRaw,
      guests,
      notes: notes || null,
      availabilitySnapshot: payload.availabilitySnapshot ?? null,
    });

    return new Response(
      JSON.stringify({
        ok: true,
        leadId: lead.id,
        createdAt: lead.created_at,
        message: "Pre-reserva registrada correctamente.",
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    const details = error instanceof Error ? error.message : "Internal server error";
    return new Response(
      JSON.stringify({
        ok: false,
        message: "No se pudo registrar la pre-reserva.",
        details,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

