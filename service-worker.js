const CACHE_NAME = "golf-pwa-ui-v2-1-2-lite";
const STATIC_ASSETS = [
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  let url;
  try { url = new URL(req.url); } catch { return; }
  if (!["http:", "https:"].includes(url.protocol)) return;

  // Never cache API
  if (url.hostname.includes("script.google.com") || url.hostname.includes("googleusercontent.com")) {
    event.respondWith(fetch(req));
    return;
  }

  // Only cache same-origin static assets, leave HTML network-first
  if (url.origin === self.location.origin && /\.(png|json|ico)$/i.test(url.pathname)) {
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(()=>{});
        }
        return res;
      }))
    );
  }
});
