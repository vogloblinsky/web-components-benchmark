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
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

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
    "revision": "eb13ed623e5b40035e700baf00228fdc"
  },
  {
    "url": "build/app/app.favbuwc1.js",
    "revision": "cfbc85d3a68b36bb59880ef1f71d23b8"
  },
  {
    "url": "build/app/app.kid4ytaa.js",
    "revision": "be37c77ddd2cd2842b1c6045ab7a4369"
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
    "revision": "0e5faf1193f4332f91348c017c8c9fd5"
  },
  {
    "url": "manifest.json",
    "revision": "0c129721ede7cd25304ebdd238d774ad"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
