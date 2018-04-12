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
    "revision": "cb37af3c27000a04eb427ce7bfa2b4cb"
  },
  {
    "url": "build/app/app.monrlfgs.js",
    "revision": "214a5e7ea679a1fb4c768a009221e30b"
  },
  {
    "url": "build/app/app.rskj0xqt.js",
    "revision": "1e7e84b4beaf3c7d1c05115925bc923d"
  },
  {
    "url": "build/app/swobkn9n.es5.js",
    "revision": "12f7e43eb786249188d575e54782527a"
  },
  {
    "url": "build/app/swobkn9n.js",
    "revision": "576853f702edd1a4b78893c4401ce5cd"
  },
  {
    "url": "index.html",
    "revision": "cfa9beddc170a1e4e13a515992a5c526"
  },
  {
    "url": "manifest.json",
    "revision": "0c129721ede7cd25304ebdd238d774ad"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
