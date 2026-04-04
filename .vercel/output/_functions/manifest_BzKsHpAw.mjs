import 'piccolore';
import { q as decodeKey } from './chunks/astro/server_BTgz9LB2.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CCMGyEq1.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/rodri/colca-domes/","cacheDir":"file:///C:/Users/rodri/colca-domes/node_modules/.astro/","outDir":"file:///C:/Users/rodri/colca-domes/dist/","srcDir":"file:///C:/Users/rodri/colca-domes/src/","publicDir":"file:///C:/Users/rodri/colca-domes/public/","buildClientDir":"file:///C:/Users/rodri/colca-domes/dist/client/","buildServerDir":"file:///C:/Users/rodri/colca-domes/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/leads.NeTHQSKN.css"}],"routeData":{"route":"/admin/leads","isIndex":false,"type":"page","pattern":"^\\/admin\\/leads\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"leads","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/leads.astro","pathname":"/admin/leads","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/domes","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/domes\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"domes","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/domes.ts","pathname":"/api/admin/domes","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/leads/status","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/leads\\/status\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"leads","dynamic":false,"spread":false}],[{"content":"status","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/leads/status.ts","pathname":"/api/admin/leads/status","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/reservations/assign","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/reservations\\/assign\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"reservations","dynamic":false,"spread":false}],[{"content":"assign","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/reservations/assign.ts","pathname":"/api/admin/reservations/assign","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/reservations/cancel","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/reservations\\/cancel\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"reservations","dynamic":false,"spread":false}],[{"content":"cancel","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/reservations/cancel.ts","pathname":"/api/admin/reservations/cancel","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/reservations/delete","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/reservations\\/delete\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"reservations","dynamic":false,"spread":false}],[{"content":"delete","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/reservations/delete.ts","pathname":"/api/admin/reservations/delete","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/reservations","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/reservations\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"reservations","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/reservations.ts","pathname":"/api/admin/reservations","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/availability","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/availability\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"availability","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/availability.ts","pathname":"/api/availability","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/calendar","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/calendar\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"calendar","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/calendar.ts","pathname":"/api/calendar","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/prebook","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/prebook\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"prebook","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/prebook.ts","pathname":"/api/prebook","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/leads.NeTHQSKN.css"}],"routeData":{"route":"/en","isIndex":true,"type":"page","pattern":"^\\/en\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/index.astro","pathname":"/en","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/leads.NeTHQSKN.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/rodri/colca-domes/src/pages/admin/leads.astro",{"propagation":"none","containsHead":true}],["C:/Users/rodri/colca-domes/src/pages/en/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/rodri/colca-domes/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/admin/leads@_@astro":"pages/admin/leads.astro.mjs","\u0000@astro-page:src/pages/api/admin/domes@_@ts":"pages/api/admin/domes.astro.mjs","\u0000@astro-page:src/pages/api/admin/leads/status@_@ts":"pages/api/admin/leads/status.astro.mjs","\u0000@astro-page:src/pages/api/admin/reservations/assign@_@ts":"pages/api/admin/reservations/assign.astro.mjs","\u0000@astro-page:src/pages/api/admin/reservations/cancel@_@ts":"pages/api/admin/reservations/cancel.astro.mjs","\u0000@astro-page:src/pages/api/admin/reservations/delete@_@ts":"pages/api/admin/reservations/delete.astro.mjs","\u0000@astro-page:src/pages/api/admin/reservations@_@ts":"pages/api/admin/reservations.astro.mjs","\u0000@astro-page:src/pages/api/availability@_@ts":"pages/api/availability.astro.mjs","\u0000@astro-page:src/pages/api/calendar@_@ts":"pages/api/calendar.astro.mjs","\u0000@astro-page:src/pages/api/prebook@_@ts":"pages/api/prebook.astro.mjs","\u0000@astro-page:src/pages/en/index@_@astro":"pages/en.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BzKsHpAw.mjs","C:/Users/rodri/colca-domes/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BhyJFb37.mjs","C:/Users/rodri/colca-domes/src/pages/admin/leads.astro?astro&type=script&index=0&lang.ts":"_astro/leads.astro_astro_type_script_index_0_lang.Dzw6XSbJ.js","C:/Users/rodri/colca-domes/src/components/PreBooking.astro?astro&type=script&index=0&lang.ts":"_astro/PreBooking.astro_astro_type_script_index_0_lang.Cb7NVTwy.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/leads.NeTHQSKN.css","/favicon.ico","/favicon.svg","/_astro/leads.astro_astro_type_script_index_0_lang.Dzw6XSbJ.js","/_astro/PreBooking.astro_astro_type_script_index_0_lang.Cb7NVTwy.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"FDwZaZd6RhCtA1r6+me2i+oZH/ndYLwQ1x7XvNAeQa0="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
