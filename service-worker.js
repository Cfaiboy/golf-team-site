// Basic cache-first for static assets, network-first for API
const CACHE_NAME = "golf-pwa-v4-ui2_3";
const ASSETS = [
  "./",
  "./index.html",
  "./config.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

function isApiRequest(url) {
  // Apps Script exec / googleusercontent proxy
  return url.hostname.includes("script.google.com") ||
         url.hostname.includes("googleusercontent.com");
}

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Only handle GET and http(s). Ignore chrome-extension:, data:, etc.
  if (req.method !== "GET") return;
  let url;
  try { url = new URL(req.url); } catch { return; }
  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  // Network-first for API (avoid caching API responses)
  if (isApiRequest(url)) {
    event.respondWith(
      fetch(req).catch(() => new Response(JSON.stringify({ ok:false, error:"offline" }), {
        headers: { "Content-Type": "application/json; charset=utf-8" }
      }))
    );
    return;
  }

  // Cache-first for same-origin static assets
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          // cache successful responses only
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(()=>{});
          }
          return res;
        });
      })
    );
  }
});
