/*jslint latedef:false*/


(function() {
  'use strict';
    var url = 'http://localhost:8080/my-notes';
    
    if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();