'use strict';

module.exports = {
    passes: [{
        passName: 'defaultPass',
        recordTrace: true,
        pauseAfterLoadMs: 5250,
        networkQuietThresholdMs: 5250,
        cpuQuietThresholdMs: 5250,
        useThrottling: true,
        gatherers: [
            'url',
            'scripts',
            'css-usage',
            'viewport',
            'viewport-dimensions',
            'theme-color',
            'manifest',
            'runtime-exceptions',
            'chrome-console-messages',
            'image-usage',
            'accessibility',
            'dobetterweb/all-event-listeners',
            'dobetterweb/anchors-with-no-rel-noopener',
            'dobetterweb/appcache',
            'dobetterweb/domstats',
            'dobetterweb/js-libraries',
            'dobetterweb/optimized-images',
            'dobetterweb/password-inputs-with-prevented-paste',
            'dobetterweb/response-compression',
            'dobetterweb/tags-blocking-first-paint',
            'dobetterweb/websql',
            'fonts',
        ],
    }],
    audits: [
        'first-meaningful-paint',
        'first-interactive',
        'consistently-interactive',
        'speed-index-metric',
        'estimated-input-latency',
        'time-to-first-byte',
        'redirects',
        'uses-rel-preload',
        'critical-request-chains',
        'network-requests',
        'user-timings',
        'bootup-time',
        'screenshot-thumbnails',
        'mainthread-work-breakdown',
        'font-display',
        'dobetterweb/link-blocking-first-paint',
        'dobetterweb/script-blocking-first-paint',
        'dobetterweb/dom-size',
        'byte-efficiency/uses-responsive-images',
        'byte-efficiency/offscreen-images',
        'byte-efficiency/unminified-css',
        'byte-efficiency/unminified-javascript',
        'byte-efficiency/unused-css-rules',
        'byte-efficiency/uses-optimized-images',
        'byte-efficiency/uses-webp-images',
        'byte-efficiency/uses-request-compression',
        'byte-efficiency/total-byte-weight',
        'byte-efficiency/uses-long-cache-ttl',
    ],
    groups: {
        'perf-metric': {
            title: 'Metrics',
            description: 'These metrics encapsulate your web app\'s performance across a number of dimensions.',
        },
        'perf-hint': {
            title: 'Opportunities',
            description: 'These are opportunities to speed up your application by optimizing the following resources.',
        },
        'perf-info': {
            title: 'Diagnostics',
            description: 'More information about the performance of your application.',
        },
    },
    categories: {
        performance: {
            name: 'Performance',
            description: 'These encapsulate your web app\'s current performance and opportunities to improve it.',
            audits: [{
                    id: 'first-meaningful-paint',
                    weight: 5,
                    group: 'perf-metric'
                },
                {
                    id: 'first-interactive',
                    weight: 5,
                    group: 'perf-metric'
                },
                {
                    id: 'consistently-interactive',
                    weight: 5,
                    group: 'perf-metric'
                },
                {
                    id: 'speed-index-metric',
                    weight: 1,
                    group: 'perf-metric'
                },
                {
                    id: 'estimated-input-latency',
                    weight: 1,
                    group: 'perf-metric'
                },
                {
                    id: 'link-blocking-first-paint',
                    weight: 0,
                    group: 'perf-hint'
                },
                {
                    id: 'script-blocking-first-paint',
                    weight: 0,
                    group: 'perf-hint'
                },
                {
                    id: 'uses-responsive-images',
                    weight: 0,
                    group: 'perf-hint'
                },
                {
                    id: 'offscreen-images',
                    weight: 0,
                    group: 'perf-hint'
                },
                {
                    id: 'unminified-css',
                    weight: 0,
                    group: 'perf-hint'
                },
                {
                    id: 'unminified-javascript',
                    weight: 0,
                    group: 'perf-hint'
                },
                {
                    id: 'unused-css-rules',
                    weight: 0,
                    group: 'perf-hint'
                },
                {
                    id: 'uses-optimized-images',
                    weight: 0,
                    group: 'perf-hint'
                },
                {
                    id: 'uses-webp-images',
                    weight: 0,
                    group: 'perf-hint'
                },
                {
                    id: 'uses-request-compression',
                    weight: 0,
                    group: 'perf-hint'
                },
                {
                    id: 'time-to-first-byte',
                    weight: 0,
                    group: 'perf-hint'
                },
                {
                    id: 'redirects',
                    weight: 0,
                    group: 'perf-hint'
                },
                {
                    id: 'uses-rel-preload',
                    weight: 0,
                    group: 'perf-hint'
                },
                {
                    id: 'total-byte-weight',
                    weight: 0,
                    group: 'perf-info'
                },
                {
                    id: 'uses-long-cache-ttl',
                    weight: 0,
                    group: 'perf-info'
                },
                {
                    id: 'dom-size',
                    weight: 0,
                    group: 'perf-info'
                },
                {
                    id: 'critical-request-chains',
                    weight: 0,
                    group: 'perf-info'
                },
                {
                    id: 'network-requests',
                    weight: 0
                },
                {
                    id: 'user-timings',
                    weight: 0,
                    group: 'perf-info'
                },
                {
                    id: 'bootup-time',
                    weight: 0,
                    group: 'perf-info'
                },
                {
                    id: 'screenshot-thumbnails',
                    weight: 0
                },
                {
                    id: 'mainthread-work-breakdown',
                    weight: 0,
                    group: 'perf-info'
                },
                {
                    id: 'font-display',
                    weight: 0,
                    group: 'perf-info'
                },
            ],
        },
    },
};