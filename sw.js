const CACHE = "sunny-move-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./apropos.html",
  "./location.html",
  "./tarifs.html",
  "./contact.html",
  "./css/style.css",
  "./js/main.js",
  "./manifest.json",
  "./images/trotti1.jpg",
  "./images/trotti2.jpg",
  "./images/trotti3.jpg",
  "./images/trotti4.jpg",
  "./images/scooter1.jpg",
  "./images/scooter2.jpg",
  "./images/solar1.jpg",
  "./images/solar2.jpg",
  "./images/beach.jpg",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const network = fetch(e.request)
        .then((res) => {
          if (res && res.status === 200 && e.request.url.startsWith(self.location.origin)) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(e.request, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
