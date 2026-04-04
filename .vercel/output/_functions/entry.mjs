import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CMpueKKo.mjs';
import { manifest } from './manifest_CWmVs71Q.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/leads.astro.mjs');
const _page2 = () => import('./pages/api/admin/domes.astro.mjs');
const _page3 = () => import('./pages/api/admin/leads/status.astro.mjs');
const _page4 = () => import('./pages/api/admin/reservations/assign.astro.mjs');
const _page5 = () => import('./pages/api/admin/reservations/cancel.astro.mjs');
const _page6 = () => import('./pages/api/admin/reservations/delete.astro.mjs');
const _page7 = () => import('./pages/api/admin/reservations.astro.mjs');
const _page8 = () => import('./pages/api/availability.astro.mjs');
const _page9 = () => import('./pages/api/calendar.astro.mjs');
const _page10 = () => import('./pages/api/prebook.astro.mjs');
const _page11 = () => import('./pages/en.astro.mjs');
const _page12 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/leads.astro", _page1],
    ["src/pages/api/admin/domes.ts", _page2],
    ["src/pages/api/admin/leads/status.ts", _page3],
    ["src/pages/api/admin/reservations/assign.ts", _page4],
    ["src/pages/api/admin/reservations/cancel.ts", _page5],
    ["src/pages/api/admin/reservations/delete.ts", _page6],
    ["src/pages/api/admin/reservations.ts", _page7],
    ["src/pages/api/availability.ts", _page8],
    ["src/pages/api/calendar.ts", _page9],
    ["src/pages/api/prebook.ts", _page10],
    ["src/pages/en/index.astro", _page11],
    ["src/pages/index.astro", _page12]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "ed42e9ac-7924-407d-8c05-a5c6b90b3b81",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
