/* Vakasha Wages - Service Worker */
var CACHE='vakasha-v1';
self.addEventListener('install',function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(['./']);}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch',function(e){
  e.respondWith(
    caches.match(e.request).then(function(r){
      return r||fetch(e.request).then(function(res){
        var rc=res.clone();
        caches.open(CACHE).then(function(c){c.put(e.request,rc);});
        return res;
      });
    }).catch(function(){return caches.match('./');})
  );
});
