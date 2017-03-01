////Caching app-shell on install
////Offline first approach
var cacheName = 'PrenatalPWA';
//var dataCacheName = 'PrenatalPWA';
var filesToCache = [
    '/',
    '/src/my-app.html'
    , '/Scripts/app.js'
    , '/index.html'
    , '/src/my-icons.html'
    , '/src/my-notes.html'
    , '/src/my-appointments.html'
    , '/src/my-details.html'
    , '/src/add-files.html'
    , '/src/add-image.html'
    , '/src/add-note.html'
    , '/src/edit-note.html'
    , '/src/view-note.html'
    , '/src/splash-page.html'
    , '/src/landing-page.html'
    , '/src/editable-note.html'
    , '/src/patient-note.html'
    , '/bower_components/polymer/polymer.html'
    , '/bower_components/polymerfire/firebase-app.html'

    , '/bower_components/app-layout/app-drawer/app-drawer.html'
    , '/bower_components/app-layout/app-drawer-layout/app-drawer-layout.html'
    , '/bower_components/app-layout/app-header/app-header.html'
    , '/bower_components/app-layout/app-header-layout/app-header-layout.html'
    , '/bower_components/app-layout/app-scroll-effects/app-scroll-effects.html'
    , '/bower_components/app-layout/app-toolbar/app-toolbar.html'
    , '/bower_components/app-route/app-location.html'
    , '/bower_components/app-route/app-route.html'
    , '/bower_components/iron-pages/iron-pages.html'
    , '/bower_components/iron-selector/iron-selector.html'
    , '/bower_components/paper-icon-button/paper-icon-button.html'
    , '/bower_components/polymerfire/polymerfire.html'    
    , '/bower_components/iron-icon/iron-icon.html'
    , '/bower_components/iron-iconset-svg/iron-iconset-svg.html'
    , '/bower_components/polymerfire/firebase-auth.html'
    , '/bower_components/polymerfire/firebase-document.html'
    , '/bower_components/polymerfire/firebase-query.html'
    , '/bower_components/paper-spinner/paper-spinner.html'
    , '/bower_components/paper-button/paper-button.html'
    , '/bower_components/iron-flex-layout/iron-flex-layout.html'
    , '/bower_components/paper-card/paper-card.html'
    , '/bower_components/paper-checkbox/paper-checkbox.html'
    ,'/bower_components/iron-form/iron-form.html'
    , '/bower_components/app-storage/app-indexeddb-mirror/app-indexeddb-mirror.html'
    , '/bower_components/vaadin-date-picker/vaadin-date-picker.html'




];
self.addEventListener('install', function (e) {
    e.waitUntil(caches.open(cacheName).then(function (cache) {
        //        return cache.add('sw-precache-config.js');
        return cache.addAll(filesToCache);
    }));
});
////Ensures SW updates cache when app shell files change
//self.addEventListener('activate', function (e) {
//    e.waitUntil(caches.keys().then(function (keyList) {
//        return Promise.all(keyList.map(function (key) {
//            if (key !== cacheName) {
//                return caches.delete(key);
//            }
//        }));
//    }));
//    return self.clients.claim();
//});
self.addEventListener('fetch', function (e) {
    console.log(e.request.url);
    e.respondWith(caches.match(e.request).then(function (response) {
        return response || fetch(e.request);
    }));
});
//});