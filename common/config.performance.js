'use strict';

module.exports = {
    passes: [
        {
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
                'fonts'
            ]
        }
    ],
    audits: ['first-interactive'],
    groups: {
        'perf-metric': {
            title: 'Metrics',
            description:
                "These metrics encapsulate your web app's performance across a number of dimensions."
        }
    },
    categories: {
        performance: {
            name: 'Performance',
            description:
                "These encapsulate your web app's current performance and opportunities to improve it.",
            audits: [
                {
                    id: 'first-interactive',
                    weight: 5,
                    group: 'perf-metric'
                }
            ]
        }
    }
};
