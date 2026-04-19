const CACHE_NAME = 'cocinita-cache-v1';
const urlsToCache = [
  './index.html',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js',
  'https://cdn-icons-png.flaticon.com/512/1830/1830839.png'
];

// Instala el trabajador y guarda las herramientas
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Cuando no hay internet, saca las herramientas de la memoria
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) { return response; }
        return fetch(event.request);
      })
  );
});