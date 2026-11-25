/* Permite usar la app sin conexión. Si cambiás datos o diseño y no ves los cambios,
   subí el número de VERSION para forzar la actualización en los celulares. */
const VERSION = "v3";
const ARCHIVOS = [
  "./", "index.html", "styles.css", "app.js", "data/datos.js",
  "manifest.webmanifest", "icons/icon.svg", "img/fondo.jpg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(ARCHIVOS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

// Primero intenta la red (datos siempre frescos); si no hay internet, usa lo guardado.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then((r) => {
        const copia = r.clone();
        caches.open(VERSION).then((c) => c.put(e.request, copia));
        return r;
      })
      .catch(() => caches.match(e.request))
  );
});
