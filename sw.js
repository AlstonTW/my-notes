const CACHE_NAME = 'my-notes-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  // 處理 Web Share Target
  if (e.request.method === 'GET' && e.request.url.includes('?')) {
    const url = new URL(e.request.url);
    if (url.searchParams.has('title') || url.searchParams.has('text') || url.searchParams.has('url')) {
      // 讓主頁面處理
      e.respondWith(fetch(e.request));
      return;
    }
  }
  // 其他請求正常處理
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
