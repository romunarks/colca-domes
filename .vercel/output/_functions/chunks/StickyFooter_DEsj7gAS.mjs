import { e as createComponent, m as maybeRenderHead, g as addAttribute, r as renderTemplate, h as createAstro, l as renderScript } from './astro/server_BTgz9LB2.mjs';
import 'piccolore';
import 'clsx';
import { g as getLangFromPath, a as getSwitchHref, t } from './Layout_DlftOhWa.mjs';
import { g as getSupabaseAdmin } from './supabase_BVy8tn3a.mjs';

const $$Astro$8 = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Header;
  const lang = getLangFromPath(Astro2.url.pathname);
  const tr = t(lang);
  const whatsappNumber = "51976251408".trim() || "51999999999";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(tr.header.whatsappText)}`;
  const switchHref = getSwitchHref(Astro2.url.pathname);
  return renderTemplate`${maybeRenderHead()}<header class="fixed inset-x-0 top-0 z-40 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur"> <nav class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"> <a href="#inicio" class="text-sm font-semibold tracking-[0.16em] text-sillar transition hover:text-gold sm:text-base">
COLCA STAR DOMES
</a> <div class="hidden items-center gap-6 md:flex"> <a href="#features" class="text-sm text-slate-200 transition hover:text-gold">${tr.header.experience}</a> <a href="#packages" class="text-sm text-slate-200 transition hover:text-gold">${tr.header.packages}</a> <a href="#gallery" class="text-sm text-slate-200 transition hover:text-gold">${tr.header.gallery}</a> <a href="#faq" class="text-sm text-slate-200 transition hover:text-gold">FAQ</a> <a href="#contact" class="text-sm text-slate-200 transition hover:text-gold">${tr.header.contact}</a> <a${addAttribute(switchHref, "href")} class="rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-slate-200 transition hover:bg-slate-800/60" aria-label="Switch language"> ${tr.header.langLabel} </a> </div> <a${addAttribute(whatsappLink, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center rounded-full border border-gold px-4 py-2 text-xs font-medium text-gold transition hover:bg-gold/10 sm:text-sm"> ${tr.header.book} </a> </nav> </header>`;
}, "C:/Users/rodri/colca-domes/src/components/Header.astro", void 0);

const $$Astro$7 = createAstro();
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Hero;
  const lang = getLangFromPath(Astro2.url.pathname);
  const tr = t(lang);
  return renderTemplate`${maybeRenderHead()}<section id="inicio" class="relative min-h-screen scroll-mt-28 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 px-4 pb-20 pt-24 sm:px-6 lg:px-8"> <div aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-35" style="background-image: radial-gradient(circle at 20% 20%, rgba(251, 191, 36, 0.28) 1px, transparent 1px), radial-gradient(circle at 70% 40%, rgba(248, 250, 252, 0.3) 1px, transparent 1px), radial-gradient(circle at 40% 80%, rgba(248, 250, 252, 0.25) 1px, transparent 1px); background-size: 140px 140px, 180px 180px, 220px 220px;"></div> <div class="relative mx-auto grid min-h-[calc(100vh-8rem)] w-full max-w-6xl items-center gap-10 lg:grid-cols-2"> <div class="text-center lg:text-left"> <p class="text-xs font-medium uppercase tracking-[0.2em] text-gold sm:text-sm"> ${tr.hero.eyebrow} </p> <h1 class="mt-5 text-4xl font-semibold leading-tight text-sillar sm:text-5xl lg:text-6xl"> ${tr.hero.title} </h1> <p class="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base lg:mx-0"> ${tr.hero.body} </p> <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"> <a href="#features" class="inline-flex items-center justify-center rounded-full border border-gold px-6 py-3 text-sm font-medium text-gold transition hover:bg-gold/10 md:text-base"> ${tr.hero.ctaPrimary} </a> <a href="#gallery" class="text-sm text-slate-200 underline-offset-4 transition hover:text-gold hover:underline"> ${tr.hero.ctaSecondary} </a> </div> </div> <div class="relative mx-auto w-full max-w-md lg:max-w-none"> <div class="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-gold/20 via-transparent to-slate-200/10 blur-xl"></div> <figure class="relative overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/70 shadow-2xl shadow-black/40"> <img src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1200"${addAttribute(tr.hero.imageAlt, "alt")} loading="eager" decoding="async" class="h-[22rem] w-full object-cover sm:h-[26rem] lg:h-[34rem]"> <div class="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/20 to-transparent"></div> <figcaption class="absolute bottom-0 w-full p-5 text-left"> <p class="text-xs uppercase tracking-[0.18em] text-gold">${tr.hero.captionEyebrow}</p> <p class="mt-2 text-sm text-slate-100 sm:text-base">${tr.hero.caption}</p> </figcaption> </figure> </div> </div> </section>`;
}, "C:/Users/rodri/colca-domes/src/components/Hero.astro", void 0);

const $$Astro$6 = createAstro();
const $$Features = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Features;
  const lang = getLangFromPath(Astro2.url.pathname);
  const tr = t(lang);
  return renderTemplate`${maybeRenderHead()}<section id="features" class="mx-auto w-full max-w-5xl scroll-mt-28 px-4 py-16 sm:px-6 md:py-24 lg:px-8"> <div class="mb-10 text-center"> <p class="text-xs font-medium uppercase tracking-[0.2em] text-gold sm:text-sm">${tr.features.eyebrow}</p> <h2 class="mt-3 text-2xl font-semibold text-sillar sm:text-3xl">${tr.features.title}</h2> </div> <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"> <article class="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"> <div class="flex h-10 w-10 items-center justify-center rounded-full border border-gold text-gold"> <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8"> <path d="M12 3c-2.5 3-3.9 5.2-3.9 7.2A3.9 3.9 0 0 0 12 14a3.9 3.9 0 0 0 3.9-3.8C15.9 8.2 14.5 6 12 3Z"></path> <path d="M12 14v7"></path> <path d="M8 19h8"></path> </svg> </div> <h3 class="mt-4 text-xl font-medium text-sillar">${tr.features.items[0].title}</h3> <p class="mt-2 text-sm leading-relaxed text-slate-300"> ${tr.features.items[0].body} </p> </article> <article class="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"> <div class="flex h-10 w-10 items-center justify-center rounded-full border border-gold text-gold"> <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8"> <path d="M3 12h18"></path> <path d="M6 12V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"></path> <path d="M4 12v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2"></path> <path d="M7 19c.8.9 2 1.5 3.2 1.5h3.6c1.2 0 2.4-.6 3.2-1.5"></path> </svg> </div> <h3 class="mt-4 text-xl font-medium text-sillar">${tr.features.items[1].title}</h3> <p class="mt-2 text-sm leading-relaxed text-slate-300"> ${tr.features.items[1].body} </p> </article> <article class="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"> <div class="flex h-10 w-10 items-center justify-center rounded-full border border-gold text-gold"> <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8"> <path d="M3 18h18"></path> <path d="M5 18l5-7 3 4 3-5 3 8"></path> <path d="M3 6h18"></path> </svg> </div> <h3 class="mt-4 text-xl font-medium text-sillar">${tr.features.items[2].title}</h3> <p class="mt-2 text-sm leading-relaxed text-slate-300"> ${tr.features.items[2].body} </p> </article> </div> </section>`;
}, "C:/Users/rodri/colca-domes/src/components/Features.astro", void 0);

const $$Astro$5 = createAstro();
const $$Packages = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Packages;
  const lang = getLangFromPath(Astro2.url.pathname);
  const tr = t(lang);
  const fallbackDomes = [
    {
      name: tr.packages.fallback[0].name,
      description: tr.packages.fallback[0].description,
      capacity: 2,
      price_per_night: 520
    },
    {
      name: tr.packages.fallback[1].name,
      description: tr.packages.fallback[1].description,
      capacity: 4,
      price_per_night: 620
    },
    {
      name: tr.packages.fallback[2].name,
      description: tr.packages.fallback[2].description,
      capacity: 2,
      price_per_night: 720
    }
  ];
  let domes = fallbackDomes;
  let loadError = "";
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from("domes").select("name, description, capacity, price_per_night").eq("active", true);
    if (error) {
      throw new Error(error.message);
    }
    if (data && data.length > 0) {
      domes = data;
    }
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Could not load packages from database.";
    console.warn("[Packages] Falling back to demo packages:", loadError);
  }
  const whatsappNumber = "51976251408".trim() || "51999999999";
  const whatsappBase = `https://wa.me/${whatsappNumber}?text=`;
  return renderTemplate`${maybeRenderHead()}<section id="packages" class="mx-auto w-full max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 md:py-24 lg:px-8"> <div class="mb-10 text-center"> <p class="text-xs font-medium uppercase tracking-[0.2em] text-gold sm:text-sm">${tr.packages.eyebrow}</p> <h2 class="mt-3 text-2xl font-semibold text-sillar sm:text-3xl">${tr.packages.title}</h2> ${loadError && renderTemplate`<p class="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-slate-400"> ${tr.packages.demoNotice} </p>`} </div> <div class="grid grid-cols-1 gap-6 md:grid-cols-3"> ${domes.map((pack, index) => {
    const message = encodeURIComponent(
      tr.packages.whatsappTemplate.replace("{name}", pack.name)
    );
    const link = `${whatsappBase}${message}`;
    const isHighlighted = index === 1;
    return renderTemplate`<article${addAttribute(`rounded-2xl border p-6 ${isHighlighted ? "border-gold bg-gradient-to-b from-gold/10 to-slate-900/80" : "border-slate-800 bg-slate-900/60"}`, "class")}> <p class="text-xs uppercase tracking-[0.18em] text-gold">${tr.packages.domeLabel}</p> <h3 class="mt-3 text-xl font-semibold text-sillar">${pack.name}</h3> <p class="mt-2 text-sm text-slate-300">${tr.packages.fromPrice} ${pack.price_per_night}</p> <ul class="mt-4 space-y-2 text-sm text-slate-200"> <li>• ${pack.description}</li> <li>• ${tr.packages.capacity}: ${pack.capacity} ${tr.packages.people}</li> </ul> <a${addAttribute(link, "href")} target="_blank" rel="noopener noreferrer" class="mt-6 inline-flex items-center justify-center rounded-full border border-gold px-4 py-2 text-sm font-medium text-gold transition hover:bg-gold/10"> ${tr.packages.cta} </a> </article>`;
  })} </div> </section>`;
}, "C:/Users/rodri/colca-domes/src/components/Packages.astro", void 0);

const $$Astro$4 = createAstro();
const $$Gallery = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Gallery;
  const lang = getLangFromPath(Astro2.url.pathname);
  const tr = t(lang);
  const images = [
    {
      src: "https://images.pexels.com/photos/1933316/pexels-photo-1933316.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: tr.gallery.alts[0],
      tall: true
    },
    {
      src: "https://images.pexels.com/photos/1309644/pexels-photo-1309644.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: tr.gallery.alts[1],
      tall: false
    },
    {
      src: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: tr.gallery.alts[2],
      tall: false
    },
    {
      src: "https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: tr.gallery.alts[3],
      tall: true
    },
    {
      src: "https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: tr.gallery.alts[4],
      tall: false
    },
    {
      src: "https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: tr.gallery.alts[5],
      tall: false
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="gallery" class="mx-auto w-full max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 md:py-24 lg:px-8"> <div class="mb-10 text-center"> <p class="text-xs font-medium uppercase tracking-[0.2em] text-gold sm:text-sm">${tr.gallery.eyebrow}</p> <h2 class="mt-3 text-2xl font-semibold text-sillar sm:text-3xl">${tr.gallery.title}</h2> <p class="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base"> ${tr.gallery.body} </p> </div> <div class="grid grid-cols-2 gap-4 md:grid-cols-3 md:auto-rows-[180px]"> ${images.map((image) => renderTemplate`<figure${addAttribute(`overflow-hidden rounded-2xl border border-slate-800 bg-slate-800/70 ${image.tall ? "md:row-span-2" : "md:row-span-1"}`, "class")}> <img${addAttribute(image.src, "src")}${addAttribute(image.alt, "alt")} loading="lazy" decoding="async" class="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"> </figure>`)} </div> </section>`;
}, "C:/Users/rodri/colca-domes/src/components/Gallery.astro", void 0);

const $$Astro$3 = createAstro();
const $$PreBooking = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$PreBooking;
  const lang = getLangFromPath(Astro2.url.pathname);
  const tr = t(lang);
  const whatsappNumber = "51976251408".trim() || "51999999999";
  const defaultWhatsApp = `https://wa.me/${whatsappNumber}`;
  return renderTemplate`${maybeRenderHead()}<section id="prebook" class="mx-auto w-full max-w-5xl scroll-mt-28 px-4 py-16 sm:px-6 md:py-24 lg:px-8"> <div class="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8"> <p class="text-xs font-medium uppercase tracking-[0.2em] text-gold sm:text-sm">${tr.prebook.eyebrow}</p> <h2 class="mt-3 text-2xl font-semibold text-sillar sm:text-3xl">${tr.prebook.title}</h2> <p class="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base"> ${tr.prebook.body} </p> <form id="prebooking-form" class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2"> <label class="flex flex-col gap-2"> <span class="text-sm text-slate-200">${tr.prebook.name}</span> <input id="guest-name" type="text" required class="rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-sillar outline-none transition focus:border-gold"${addAttribute(tr.prebook.namePlaceholder, "placeholder")}> </label> <div class="flex flex-col gap-2 md:col-span-2"> <span class="text-sm text-slate-200">${tr.prebook.dates}</span> <div class="grid grid-cols-1 gap-3 sm:grid-cols-2"> <input id="checkin-date" type="date" required class="hidden" aria-hidden="true" tabindex="-1"> <input id="checkout-date" type="date" required class="hidden" aria-hidden="true" tabindex="-1"> <button id="date-range-button" type="button" class="inline-flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-sillar outline-none transition focus:border-gold"> <span id="date-range-label" class="text-left text-slate-200">${tr.prebook.selectRange}</span> <span class="text-xs text-slate-400">${tr.prebook.calendar}</span> </button> <div class="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-xs text-slate-300"> <p class="font-medium text-slate-200">${tr.prebook.tipTitle}</p> <p class="mt-1">${tr.prebook.tipBody}</p> </div> </div> <div id="calendar-popover" class="mt-3 hidden rounded-2xl border border-slate-800 bg-slate-950/90 p-4"> <div class="mb-3 flex items-center justify-between gap-3"> <p class="text-xs uppercase tracking-[0.12em] text-slate-400">${tr.prebook.chooseRange}</p> <div class="flex items-center gap-2"> <button id="cal-prev" type="button" class="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 transition hover:bg-slate-800/60">
‹
</button> <button id="cal-next" type="button" class="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 transition hover:bg-slate-800/60">
›
</button> <button id="cal-close" type="button" class="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 transition hover:bg-slate-800/60"> ${tr.prebook.close} </button> </div> </div> <div id="calendar-grid" class="grid grid-cols-1 gap-4 md:grid-cols-2"></div> <p class="mt-3 text-xs text-slate-400"> ${tr.prebook.legend} <span class="text-emerald-300">green</span> ${tr.prebook.available},${" "} <span class="text-rose-300">red</span> ${tr.prebook.soldOut}.
</p> </div> </div> <label class="flex flex-col gap-2"> <span class="text-sm text-slate-200">${tr.prebook.guests}</span> <select id="guests" class="rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-sillar outline-none transition focus:border-gold"> <option value="1">${tr.prebook.guestLabel.replace("{n}", "1")}</option> <option value="2" selected>${tr.prebook.guestLabel.replace("{n}", "2")}</option> <option value="3">${tr.prebook.guestLabel.replace("{n}", "3")}</option> <option value="4">${tr.prebook.guestLabel.replace("{n}", "4")}</option> </select> </label> <label class="flex flex-col gap-2 md:col-span-2"> <span class="text-sm text-slate-200">${tr.prebook.notes}</span> <textarea id="extra-message" rows="4" class="rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-sillar outline-none transition focus:border-gold"${addAttribute(tr.prebook.notesPlaceholder, "placeholder")}></textarea> </label> <div class="md:col-span-2"> <p id="availability-status" class="mb-4 hidden rounded-xl border px-4 py-3 text-sm"></p> <button type="submit" class="inline-flex w-full items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 sm:w-auto"> ${tr.prebook.submit} </button> </div> </form> <noscript> <p class="mt-4 text-sm text-slate-300"> ${tr.prebook.noScript} <a${addAttribute(defaultWhatsApp, "href")} target="_blank" rel="noopener noreferrer" class="text-gold underline"> ${tr.prebook.whatsappBooking} </a> </p> </noscript> </div> </section> ${renderScript($$result, "C:/Users/rodri/colca-domes/src/components/PreBooking.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/rodri/colca-domes/src/components/PreBooking.astro", void 0);

const $$Astro$2 = createAstro();
const $$Faq = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Faq;
  const lang = getLangFromPath(Astro2.url.pathname);
  const tr = t(lang);
  return renderTemplate`${maybeRenderHead()}<section id="faq" class="mx-auto w-full max-w-4xl scroll-mt-28 px-4 py-16 sm:px-6 md:py-24 lg:px-8"> <div class="mb-10 text-center"> <p class="text-xs font-medium uppercase tracking-[0.2em] text-gold sm:text-sm">FAQ</p> <h2 class="mt-3 text-2xl font-semibold text-sillar sm:text-3xl">${tr.faq.title}</h2> </div> <div class="space-y-4"> <details class="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"> <summary class="cursor-pointer text-sm font-medium text-sillar sm:text-base"> ${tr.faq.items[0].q} </summary> <p class="mt-3 text-sm leading-relaxed text-slate-300"> ${tr.faq.items[0].a} </p> </details> <details class="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"> <summary class="cursor-pointer text-sm font-medium text-sillar sm:text-base"> ${tr.faq.items[1].q} </summary> <p class="mt-3 text-sm leading-relaxed text-slate-300"> ${tr.faq.items[1].a} </p> </details> <details class="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"> <summary class="cursor-pointer text-sm font-medium text-sillar sm:text-base"> ${tr.faq.items[2].q} </summary> <p class="mt-3 text-sm leading-relaxed text-slate-300"> ${tr.faq.items[2].a} </p> </details> <details class="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"> <summary class="cursor-pointer text-sm font-medium text-sillar sm:text-base"> ${tr.faq.items[3].q} </summary> <p class="mt-3 text-sm leading-relaxed text-slate-300"> ${tr.faq.items[3].a} </p> </details> </div> </section>`;
}, "C:/Users/rodri/colca-domes/src/components/Faq.astro", void 0);

const $$Astro$1 = createAstro();
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  const lang = getLangFromPath(Astro2.url.pathname);
  const tr = t(lang);
  const whatsappNumber = "51976251408".trim() || "51999999999";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(tr.footer.whatsappText)}`;
  return renderTemplate`${maybeRenderHead()}<footer id="contact" class="scroll-mt-28 mt-8 border-t border-slate-800 bg-slate-950/60"> <div class="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8"> <div> <p class="text-xs uppercase tracking-[0.2em] text-gold">Colca Star Domes</p> <p class="mt-3 text-sm leading-relaxed text-slate-300"> ${tr.footer.about} </p> </div> <div> <p class="text-sm font-semibold text-sillar">${tr.footer.explore}</p> <ul class="mt-3 space-y-2 text-sm text-slate-300"> <li><a href="#inicio" class="transition hover:text-gold">${tr.footer.home}</a></li> <li><a href="#features" class="transition hover:text-gold">${tr.header.experience}</a></li> <li><a href="#packages" class="transition hover:text-gold">${tr.header.packages}</a></li> <li><a href="#gallery" class="transition hover:text-gold">${tr.header.gallery}</a></li> <li><a href="#faq" class="transition hover:text-gold">FAQ</a></li> </ul> </div> <div> <p class="text-sm font-semibold text-sillar">${tr.footer.contact}</p> <ul class="mt-3 space-y-2 text-sm text-slate-300"> <li>Arequipa, Peru</li> <li> <a${addAttribute(whatsappLink, "href")} target="_blank" rel="noopener noreferrer" class="transition hover:text-gold"> ${tr.footer.whatsapp} </a> </li> <li><a href="#prebook" class="transition hover:text-gold">${tr.footer.prebook}</a></li> <li> <a href="mailto:reservas@colcastardomes.com" class="transition hover:text-gold">
reservas@colcastardomes.com
</a> </li> </ul> </div> </div> <div class="border-t border-slate-800/80"> <div class="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-slate-400 sm:flex-row sm:px-6 lg:px-8"> <p>${tr.footer.copyrightSuffix.replace("{year}", String((/* @__PURE__ */ new Date()).getFullYear()))}</p> <p>${tr.footer.tagline}</p> </div> </div> </footer>`;
}, "C:/Users/rodri/colca-domes/src/components/Footer.astro", void 0);

const $$Astro = createAstro();
const $$StickyFooter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$StickyFooter;
  const lang = getLangFromPath(Astro2.url.pathname);
  const tr = t(lang);
  const whatsappNumber = "51976251408".trim() || "51999999999";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(tr.sticky.whatsappText)}`;
  return renderTemplate`${maybeRenderHead()}<div class="fixed inset-x-0 bottom-0 z-50 border-t border-slate-800 bg-slate-950/85 backdrop-blur"> <div class="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row sm:px-6"> <p class="text-center text-xs text-slate-200 sm:text-left sm:text-sm"> ${tr.sticky.prompt} </p> <a${addAttribute(whatsappLink, "href")} target="_blank" rel="noopener noreferrer" aria-label="Reservar via WhatsApp en Colca Star Domes" class="inline-flex w-full items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 sm:w-auto md:text-base"> ${tr.sticky.cta} </a> </div> </div>`;
}, "C:/Users/rodri/colca-domes/src/components/StickyFooter.astro", void 0);

export { $$Header as $, $$Hero as a, $$Features as b, $$Packages as c, $$Gallery as d, $$PreBooking as e, $$Faq as f, $$Footer as g, $$StickyFooter as h };
