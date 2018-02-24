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
    "revision": "160407c0294e206ed7bb478ef79af0f9"
  },
  {
    "url": "build/app/3klnlp3d.es5.js",
    "revision": "efb7bf509e2d65dea9e305e4d6b48b35"
  },
  {
    "url": "build/app/3klnlp3d.js",
    "revision": "0780dc5bf4f75ac7c34e28bb56e88c44"
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
    "revision": "4bb40821484a131691cd20162a055694"
  },
  {
    "url": "host.config.json",
    "revision": "2981c16496a35c7499efcd3c13dbb799"
  },
  {
    "url": "index.html",
    "revision": "463ec6b7a97c0c163739fccf5ec551dc"
  },
  {
    "url": "manifest.json",
    "revision": "0c129721ede7cd25304ebdd238d774ad"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
