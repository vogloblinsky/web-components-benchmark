'use strict';

const puppeteer = require('puppeteer');

const fs = require('fs-extra');

const perfConfig = require('./config.performance.js');

const {
    gatherLighthouseMetrics
} = require('./helpers');

const metas = require('../../results/meta');

const resultsFile = '../results/todo-tti.json';

let results = {};

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true
    });
    const page = await browser.newPage();

    const elements = [...metas.wc, ...metas.fw];

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const url = `http://localhost:3000/${element.todo.url}`;

        if (element.todo.url) {
            await page.goto(url);
            const lighthouseMetrics = await gatherLighthouseMetrics(page, perfConfig);
            const firstInteractive = parseInt(lighthouseMetrics.audits['first-interactive']['rawValue'], 10);
            console.log(`FirstInteractive ${element.name} : ${firstInteractive}`);

            results[element.slug] = firstInteractive;
        }
    }

    fs.outputJsonSync(resultsFile, results);

    await browser.close();
})();