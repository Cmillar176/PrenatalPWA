/*jslint latedef:false*/
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
//Caching app-shell on install
//Offline first approach
var cacheName = 'PrenatalPWA';
var dataCacheName = 'PrenatalPWA';
var filesToCache = [
    '/src/my-app.html',
    '/Scripts/app.js',
    '/index.html',
    '/src/my-icons.html',
    '/src/my-notes.html',
    '/src/my-appointments.html',
    '/src/my-details.html',
    '/src/my-files.html',
    '/src/add-image.html',
    '/src/splash-page.html',
    '/src/landing-page.html'
];
self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(caches.open(cacheName).then(function (cache) {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
    }));
});

//Ensures SW updates cache when app shell files change
self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(caches.keys().then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
            if (key !== cacheName) {
                console.log('[ServiceWorker] Removing old cache', key);
                return caches.delete(key);
            }
        }));
    }));
    return self.clients.claim();
});
self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    caches.match(e.request).then(function(cachedResponse) {
      return cachedResponse || fetch(e.request);
    })
});