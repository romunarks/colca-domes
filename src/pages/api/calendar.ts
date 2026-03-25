import type { APIRoute } from "astro";
import { getConfigNumber, tryGetSupabaseAdmin } from "../../lib/server/supabase";

const iso = (d: Date) => d.toISOString().slice(0, 10);

export const GET: APIRoute = async ({ url }) => {
  const year = Number(url.searchParams.get("year"));
  const month = Number(url.searchParams.get("month")); // 1-12

  if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) {
    return new Response(JSON.stringify({ ok: false, message: "Parametros invalidos: year, month(1-12)." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const totalDomesFallback = getConfigNumber("TOTAL_DOMES", 6);

  const start = new Date(Date.UTC(year, month - 1, 1));
  const end = new Date(Date.UTC(year, month, 1)); // exclusive

  const supabase = tryGetSupabaseAdmin();
  if (!supabase) {
    const days: { date: string; availableDomes: number }[] = [];
    for (let d = new Date(start); d < end; d.setUTCDate(d.getUTCDate() + 1)) {
      days.push({ date: iso(d), availableDomes: totalDomesFallback });
    }
    return new Response(JSON.stringify({ ok: true, mode: "demo", totalDomes: totalDomesFallback, days }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { count: activeDomesCount, error: domesCountError } = await supabase
      .from("domes")
      .select("id", { count: "exact", head: true })
      .eq("active", true);

    if (domesCountError) throw new Error(domesCountError.message);
    const totalDomes = activeDomesCount && activeDomesCount > 0 ? activeDomesCount : totalDomesFallback;

    const { data: reservations, error: reservationsError } = await supabase
      .from("reservations")
      .select("check_in, check_out, domes_booked, status")
      .in("status", ["pending", "confirmed"])
      .lt("check_in", iso(end))
      .gt("check_out", iso(start));

    if (reservationsError) throw new Error(reservationsError.message);

    const days: { date: string; availableDomes: number }[] = [];
    for (let d = new Date(start); d < end; d.setUTCDate(d.getUTCDate() + 1)) {
      const dayIso = iso(d);
      const occupied = (reservations ?? []).reduce((sum, row) => {
        const checkIn = String((row as any).check_in);
        const checkOut = String((row as any).check_out);
        // Occupied if check_in <= day < check_out
        if (checkIn <= dayIso && dayIso < checkOut) {
          return sum + Number((row as any).domes_booked ?? 0);
        }
        return sum;
      }, 0);

      days.push({ date: dayIso, availableDomes: Math.max(0, totalDomes - occupied) });
    }

    return new Response(JSON.stringify({ ok: true, totalDomes, days }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const days: { date: string; availableDomes: number }[] = [];
    for (let d = new Date(start); d < end; d.setUTCDate(d.getUTCDate() + 1)) {
      days.push({ date: iso(d), availableDomes: totalDomesFallback });
    }
    return new Response(
      JSON.stringify({
        ok: true,
        mode: "demo",
        totalDomes: totalDomesFallback,
        days,
        message: error instanceof Error ? error.message : "No se pudo consultar el calendario real.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
};

