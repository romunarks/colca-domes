import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, h as createAstro, m as maybeRenderHead, n as Fragment, g as addAttribute } from '../../chunks/astro/server_BTgz9LB2.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_DlftOhWa.mjs';
import { g as getSupabaseAdmin } from '../../chunks/supabase_BVy8tn3a.mjs';
import { l as listRecentBookingLeads, a as listUpcomingReservations } from '../../chunks/booking__DvAXFC1.mjs';
import { r as requireAdminAuth } from '../../chunks/adminAuth_BIWm4ElA.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Leads = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Leads;
  const auth = requireAdminAuth(Astro2.request);
  if (!auth.ok) return auth.response;
  let leads = [];
  let reservations = [];
  let loadError = "";
  let reservationsError = "";
  const supabase = getSupabaseAdmin();
  try {
    leads = await listRecentBookingLeads(supabase, 100);
  } catch (error) {
    loadError = error instanceof Error ? error.message : "No se pudo cargar la lista de leads.";
  }
  try {
    reservations = await listUpcomingReservations(supabase, 150);
  } catch (error) {
    reservationsError = error instanceof Error ? error.message : "No se pudieron cargar las reservas.";
    reservations = [];
  }
  const totals = {
    all: leads.length,
    new: leads.filter((lead) => lead.status === "new").length,
    contacted: leads.filter((lead) => lead.status === "contacted").length,
    closed: leads.filter((lead) => lead.status === "closed").length
  };
  const reservationTotals = {
    all: reservations.length,
    confirmed: reservations.filter((r) => r.status === "confirmed").length,
    pending: reservations.filter((r) => r.status === "pending").length
  };
  const formatDateTime = (value) => new Date(value).toLocaleString("es-PE", {
    dateStyle: "medium",
    timeStyle: "short"
  });
  const whatsappNumber = "51976251408".trim() || "51999999999";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Admin Leads | Colca Star Domes", "description": "Vista interna de pre-reservas registradas desde la web." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mx-auto w-full max-w-7xl px-4 pb-14 pt-24 sm:px-6 lg:px-8"> <div class="mb-8 flex flex-wrap items-end justify-between gap-4"> <div> <p class="text-xs uppercase tracking-[0.2em] text-gold">Admin dashboard</p> <h1 class="mt-2 text-3xl font-semibold text-sillar">Leads de pre-reserva</h1> <p class="mt-2 text-sm text-slate-300">
Esta vista muestra los leads guardados en base de datos antes de abrir WhatsApp.
</p> </div> <a href="/" class="inline-flex items-center justify-center rounded-full border border-gold px-4 py-2 text-sm font-medium text-gold transition hover:bg-gold/10">
Volver a la landing
</a> </div> ${loadError && renderTemplate`<div class="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-5 text-rose-100"> <p class="text-sm font-medium">No se pudo cargar la data</p> <p class="mt-2 text-sm">${loadError}</p> </div>`} ${!loadError && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <div class="grid grid-cols-2 gap-4 md:grid-cols-4"> <article class="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"> <p class="text-xs uppercase tracking-[0.15em] text-slate-400">Total leads</p> <p class="mt-2 text-2xl font-semibold text-sillar">${totals.all}</p> </article> <article class="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"> <p class="text-xs uppercase tracking-[0.15em] text-slate-400">Nuevos</p> <p class="mt-2 text-2xl font-semibold text-amber-300">${totals.new}</p> </article> <article class="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"> <p class="text-xs uppercase tracking-[0.15em] text-slate-400">Contactados</p> <p class="mt-2 text-2xl font-semibold text-sky-300">${totals.contacted}</p> </article> <article class="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"> <p class="text-xs uppercase tracking-[0.15em] text-slate-400">Cerrados</p> <p class="mt-2 text-2xl font-semibold text-emerald-300">${totals.closed}</p> </article> </div> <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3"> <article class="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"> <p class="text-xs uppercase tracking-[0.15em] text-slate-400">Reservas activas</p> <p class="mt-2 text-2xl font-semibold text-sillar">${reservationTotals.all}</p> </article> <article class="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"> <p class="text-xs uppercase tracking-[0.15em] text-slate-400">Confirmadas</p> <p class="mt-2 text-2xl font-semibold text-emerald-300">${reservationTotals.confirmed}</p> </article> <article class="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"> <p class="text-xs uppercase tracking-[0.15em] text-slate-400">Pendientes</p> <p class="mt-2 text-2xl font-semibold text-amber-300">${reservationTotals.pending}</p> </article> </div> <div class="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60"> <div class="overflow-x-auto"> <table class="min-w-full text-left text-sm"> <thead class="bg-slate-950/70 text-xs uppercase tracking-[0.12em] text-slate-400"> <tr> <th class="px-4 py-3">Fecha</th> <th class="px-4 py-3">Lead</th> <th class="px-4 py-3">Estadia</th> <th class="px-4 py-3">Huespedes</th> <th class="px-4 py-3">Estado</th> <th class="px-4 py-3">Estimado</th> <th class="px-4 py-3">Notas</th> <th class="px-4 py-3">Acciones</th> </tr> </thead> <tbody class="divide-y divide-slate-800"> ${leads.length === 0 ? renderTemplate`<tr> <td colspan="8" class="px-4 py-6 text-center text-slate-300">
Aun no hay leads registrados.
</td> </tr>` : leads.map((lead) => renderTemplate`<tr class="align-top text-slate-100"> <td class="px-4 py-3 text-xs text-slate-300">${formatDateTime(lead.created_at)}</td> <td class="px-4 py-3"> <p class="font-medium">${lead.full_name}</p> <p class="text-xs text-slate-400">${lead.id}</p> </td> <td class="px-4 py-3 text-xs sm:text-sm"> ${lead.check_in} → ${lead.check_out} </td> <td class="px-4 py-3">${lead.guests}</td> <td class="px-4 py-3"> <select class="rounded-xl border border-slate-700 bg-slate-950/60 px-2 py-1 text-xs text-slate-100" data-lead-status${addAttribute(lead.id, "data-lead-id")}${addAttribute(`Estado lead ${lead.id}`, "aria-label")}> <option value="new"${addAttribute(lead.status === "new", "selected")}>new</option> <option value="contacted"${addAttribute(lead.status === "contacted", "selected")}>contacted</option> <option value="qualified"${addAttribute(lead.status === "qualified", "selected")}>qualified</option> <option value="closed"${addAttribute(lead.status === "closed", "selected")}>closed</option> </select> </td> <td class="px-4 py-3 text-xs sm:text-sm"> ${typeof lead.availability_snapshot?.totalEstimate === "number" ? `S/ ${lead.availability_snapshot.totalEstimate}` : "-"} </td> <td class="px-4 py-3 text-xs text-slate-300">${lead.notes ?? "-"}</td> <td class="px-4 py-3"> <div class="flex flex-wrap gap-2"> <a class="inline-flex items-center justify-center rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 transition hover:bg-slate-800/60"${addAttribute(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hola, soy de Colca Star Domes. Confirmamos tu solicitud.
Lead: ${lead.id}
Check-in: ${lead.check_in}
Check-out: ${lead.check_out}
Huespedes: ${lead.guests}`
  )}`, "href")} target="_blank" rel="noopener noreferrer">
WhatsApp
</a> <div class="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1"> <label class="text-[11px] text-slate-400">
Domos
<input type="number" min="1" max="20" value="1" class="ml-2 w-14 rounded-lg border border-slate-700 bg-slate-950/60 px-2 py-1 text-xs text-slate-100" data-res-domes${addAttribute(lead.id, "data-lead-id")}> </label> <label class="text-[11px] text-slate-400">
Estado
<select class="ml-2 rounded-lg border border-slate-700 bg-slate-950/60 px-2 py-1 text-xs text-slate-100" data-res-status${addAttribute(lead.id, "data-lead-id")}> <option value="pending">pending</option> <option value="confirmed" selected>confirmed</option> </select> </label> </div> <button type="button" class="inline-flex items-center justify-center rounded-full border border-gold px-3 py-1 text-xs font-medium text-gold transition hover:bg-gold/10" data-create-reservation${addAttribute(lead.id, "data-lead-id")}>
Convertir a reserva
</button> </div> </td> </tr>`)} </tbody> </table> </div> </div> <div class="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60"> <div class="flex items-center justify-between gap-4 border-b border-slate-800 bg-slate-950/40 px-4 py-3"> <p class="text-xs uppercase tracking-[0.12em] text-slate-400">Reservas (pendientes/confirmadas)</p> <button type="button" class="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 transition hover:bg-slate-800/60" data-refresh-reservations>
Refrescar
</button> </div> ${reservationsError && renderTemplate`<div class="border-b border-slate-800 px-4 py-3 text-xs text-amber-200">
No se pudieron cargar reservas: ${reservationsError}. Ejecuta el \`supabase/schema.sql\` actualizado (añade
                \`reservations.lead_id\`).
</div>`} <div class="overflow-x-auto"> <table class="min-w-full text-left text-sm"> <thead class="bg-slate-950/70 text-xs uppercase tracking-[0.12em] text-slate-400"> <tr> <th class="px-4 py-3">Check-in</th> <th class="px-4 py-3">Check-out</th> <th class="px-4 py-3">Domos</th> <th class="px-4 py-3">Asignados</th> <th class="px-4 py-3">Estado</th> <th class="px-4 py-3">Lead</th> <th class="px-4 py-3">Acciones</th> </tr> </thead> <tbody class="divide-y divide-slate-800" id="reservations-body"> ${reservations.length === 0 ? renderTemplate`<tr> <td colspan="7" class="px-4 py-6 text-center text-slate-300">
Aun no hay reservas activas.
</td> </tr>` : reservations.map((r) => renderTemplate`<tr class="text-slate-100"> <td class="px-4 py-3 text-xs sm:text-sm">${r.check_in}</td> <td class="px-4 py-3 text-xs sm:text-sm">${r.check_out}</td> <td class="px-4 py-3">${r.domes_booked}</td> <td class="px-4 py-3 text-xs text-slate-300">-</td> <td class="px-4 py-3"> <span class="rounded-full border border-slate-700 px-2 py-1 text-xs capitalize text-slate-200"> ${r.status} </span> </td> <td class="px-4 py-3 text-xs text-slate-400">${r.lead_id ?? "-"}</td> <td class="px-4 py-3"> <div class="flex flex-wrap gap-2"> <button type="button" class="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 transition hover:bg-slate-800/60" data-assign-domes${addAttribute(r.id, "data-reservation-id")}>
Asignar domos
</button> <button type="button" class="rounded-full border border-amber-400/60 px-3 py-1 text-xs text-amber-200 transition hover:bg-amber-400/10" data-cancel-reservation${addAttribute(r.id, "data-reservation-id")}>
Cancelar
</button> <button type="button" class="rounded-full border border-rose-500/50 px-3 py-1 text-xs text-rose-200 transition hover:bg-rose-500/10" data-delete-reservation${addAttribute(r.id, "data-reservation-id")}>
Borrar
</button> </div> </td> </tr>`)} </tbody> </table> </div> </div> ` })}`} </section> ` })} ${renderScript($$result, "C:/Users/rodri/colca-domes/src/pages/admin/leads.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/rodri/colca-domes/src/pages/admin/leads.astro", void 0);
const $$file = "C:/Users/rodri/colca-domes/src/pages/admin/leads.astro";
const $$url = "/admin/leads";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Leads,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
