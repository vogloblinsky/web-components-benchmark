/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/YYPcyY
 */

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.0.0-alpha.6/workbox-sw.js"
);

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "assets/icon/favicon.ico",
    "revision": "d2f619d796fbe8bed6200da2691aa5b6"
  },
  {
    "url": "assets/icon/icon.png",
    "revision": "b96ad6e1e0b755c8cd45e6aec40bca25"
  },
  {
    "url": "build/app.js",
    "revision": "c50ca6031ca14e52ad81ca81736f011f"
  },
  {
    "url": "build/app/1g1binlm.es5.js",
    "revision": "ce1ecd14c7ae3f6974c7d47fe9b2b8a6"
  },
  {
    "url": "build/app/1g1binlm.js",
    "revision": "8a7c1eac51ba750f2233d94575b07159"
  },
  {
    "url": "build/app/app.d2kg5alw.js",
    "revision": "d29baa579d181ddcd4fadbdd53643ba8"
  },
  {
    "url": "build/app/app.pu1raxao.js",
    "revision": "0dfbb542636649631f14eb72a859ff17"
  },
  {
    "url": "build/app/app.registry.json",
    "revision": "e0a6b1fd3a93d7079f273ba64cfc389e"
  },
  {
    "url": "host.config.json",
    "revision": "7691ec6d2903c934f210bff117fe0ee8"
  },
  {
    "url": "index.html",
    "revision": "8e75d31790306eaa5ecebbee00ef600a"
  },
  {
    "url": "manifest.json",
    "revision": "0c129721ede7cd25304ebdd238d774ad"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
