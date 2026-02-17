// Minimal/no-op Service Worker for the site.
// Keeps registration benign and avoids surprising errors when present.

self.addEventListener('install', (event) => {
  // Activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Optional: no-op fetch handler so worker doesn't interfere
self.addEventListener('fetch', (event) => {
  // No special handling - just leave requests to the network
});
