import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_BTgz9LB2.mjs';
import 'piccolore';
import { $ as $$Layout, t } from '../chunks/Layout_DlftOhWa.mjs';
import { $ as $$Header, a as $$Hero, b as $$Features, c as $$Packages, d as $$Gallery, e as $$PreBooking, f as $$Faq, g as $$Footer, h as $$StickyFooter } from '../chunks/StickyFooter_DEsj7gAS.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const tr = t("es");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": tr.page.homeTitle, "description": tr.page.homeDesc }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "Features", $$Features, {})} ${renderComponent($$result2, "Packages", $$Packages, {})} ${renderComponent($$result2, "Gallery", $$Gallery, {})} ${renderComponent($$result2, "PreBooking", $$PreBooking, {})} ${renderComponent($$result2, "Faq", $$Faq, {})} ${renderComponent($$result2, "Footer", $$Footer, {})} ${renderComponent($$result2, "StickyFooter", $$StickyFooter, {})} ` })}`;
}, "C:/Users/rodri/colca-domes/src/pages/index.astro", void 0);

const $$file = "C:/Users/rodri/colca-domes/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
