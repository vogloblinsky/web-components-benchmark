'use strict';

// https://github.com/llatinov/sample-performance-testing-in-browser

const lighthouse = require('lighthouse');

async function gatherLighthouseMetrics(page, config) {
    // Port is in formаt: ws://127.0.0.1:52046/devtools/browser/675a2fad-4ccf-412b-81bb-170fdb2cc39c
    const port = await page.browser().wsEndpoint().split(':')[2].split('/')[0];
    return await lighthouse(page.url(), {
        port: port
    }, config).then(results => {
        delete results.artifacts;
        return results;
    });
}

module.exports = {
    gatherLighthouseMetrics
};