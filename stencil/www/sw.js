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


importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.0.0-alpha.3/workbox-sw.js");









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
    "revision": "4d4a33bef8f811eab8fdc857fba072c7"
  },
  {
    "url": "build/app/app.qihkyryf.js",
    "revision": "2b617bd7671ebcc376f93e29f7b6a6c8"
  },
  {
    "url": "build/app/app.registry.json",
    "revision": "1aa4145a22deb22dcde5c6c1bd94b974"
  },
  {
    "url": "build/app/app.sjpanv7r.js",
    "revision": "55bf0c5555b99a1b3329dcea2535cecd"
  },
  {
    "url": "build/app/jrobbnm3.es5.js",
    "revision": "762f7fc1c3bc19522419180cb39753a3"
  },
  {
    "url": "build/app/jrobbnm3.js",
    "revision": "e84a679db6196562fcb8b1569a87cb4d"
  },
  {
    "url": "build/app/jrobbnm3.sc.es5.js",
    "revision": "458eb29565bb31a3332dba88fea37b4f"
  },
  {
    "url": "build/app/jrobbnm3.sc.js",
    "revision": "6da1d7a37642ada62a4c315783499829"
  },
  {
    "url": "host.config.json",
    "revision": "2c1c77b8ee8777d0294403fa78cc0b78"
  },
  {
    "url": "index.html",
    "revision": "527439151e8410e61fce5b27a47fc053"
  },
  {
    "url": "manifest.json",
    "revision": "0c129721ede7cd25304ebdd238d774ad"
  }
].concat(self.__precacheManifest || []);

if (Array.isArray(self.__precacheManifest)) {
  workbox.precaching.suppressWarnings();
  workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
}
