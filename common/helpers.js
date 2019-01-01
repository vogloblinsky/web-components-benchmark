'use strict';

// https://github.com/llatinov/sample-performance-testing-in-browser

const lighthouse = require('lighthouse');
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const DevtoolsTimelineModel = require('devtools-timeline-model');

const perfConfig = require('./config.performance.js');

const LOCALHOST = 'http://localhost:3000';
const numberOftests = 10;
const numberOfModifications = 50;
const selectorInput = `document.querySelector('my-todo').shadowRoot.querySelector('todo-input').shadowRoot.querySelector('input')`;
const selectorInputNoShadowDom = `document.querySelector('my-todo').querySelector('todo-input').querySelector('input')`;

async function gatherLighthouseMetrics(page, config) {
    // Port is in formаt: ws://127.0.0.1:52046/devtools/browser/675a2fad-4ccf-412b-81bb-170fdb2cc39c
    const port = await page
        .browser()
        .wsEndpoint()
        .split(':')[2]
        .split('/')[0];
    return await lighthouse(
        page.url(),
        {
            port: port
        },
        config
    ).then(results => {
        delete results.artifacts;
        return results;
    });
}

function processRawData(filename, i) {
    let events = require('fs').readFileSync(filename, 'utf8');
    try {
        var model = new DevtoolsTimelineModel(events);
        var topDown = model.topDown();
        /*console.log(
            `Top down tree total time ${i}: ${Math.ceil(topDown.totalTime)}`
        );*/
        return topDown.totalTime;
    } catch (e) {
        // console.log(e);
        return 0;
    }
}

async function benchPageLoad(element, context) {
    const slug = element.slug;
    fs.ensureDirSync(`benchmarks-results/${slug}`);

    let browser;
    let page;
    let average = 0;
    let filename;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        });
        page = await browser.newPage();

        filename = `benchmarks-results/${slug}/load-page_${i}.json`;

        await page.tracing.start({
            path: filename
        });
        await page.goto(`${LOCALHOST}/demos/${context}/${element.slug}`);
        await page.tracing.stop();

        average += processRawData(filename, i);

        await browser.close();
    }

    return average / numberOftests;
}

async function benchCreate(element, context) {
    const slug = element.slug;
    const selector = element.noshadowdom
        ? selectorInputNoShadowDom
        : selectorInput;

    console.log(selector);

    fs.ensureDirSync(`benchmarks-results/${slug}`);

    let browser;
    let page;
    let average = 0;
    let filename;

    console.log(`${LOCALHOST}/demos/${context}/${element.slug}`);

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        });
        page = await browser.newPage();

        filename = `benchmarks-results/${slug}/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/demos/${context}/${element.slug}`, {
            waitUntil: 'load'
        });

        await page.waitFor('my-todo');

        const mytodo = await page.evaluateHandle(
            `document.querySelector('my-todo')`
        );
        console.log(typeof mytodo);

        if (!element.noshadowdom) {
            const todoinput = await page.evaluateHandle(
                `document.querySelector('my-todo').shadowRoot.querySelector('todo-input')`
            );
            console.log(typeof todoinput);
        }

        const inputHandle = await page.evaluateHandle(selector);
        await page.tracing.start({
            path: filename
        });

        for (let j = 0; j < numberOfModifications; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.stop();

        average += processRawData(filename, i);

        await browser.close();
    }

    return average / numberOftests;
}

async function benchDelete(element, context) {
    const slug = element.slug;
    const selector = element.noshadowdom
        ? selectorInputNoShadowDom
        : selectorInput;

    fs.ensureDirSync(`benchmarks-results/${slug}`);

    let browser;
    let page;
    let average = 0;
    let filename;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        });
        page = await browser.newPage();

        filename = `benchmarks-results/${slug}/delete-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/demos/${context}/${element.slug}`, {
            waitUntil: 'load'
        });

        await page.setViewport({
            width: 800,
            height: 6000
        });

        await page.waitFor('my-todo');

        const inputHandle = await page.evaluateHandle(selector);

        for (let j = 0; j < numberOfModifications; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        for (let j = 0; j < numberOfModifications; j++) {
            await page.mouse.click(646, 362);
            if (slug === 'omi') {
                await page.waitFor(50); // It seems delete operations are too fast for omi
            }
        }

        await page.tracing.stop();

        average += processRawData(filename, i);

        await browser.close();
    }

    return average / numberOftests;
}

async function benchEdit(element, context) {
    const slug = element.slug;
    const selector = element.noshadowdom
        ? selectorInputNoShadowDom
        : selectorInput;

    fs.ensureDirSync(`benchmarks-results/${slug}`);

    let browser;
    let page;
    let average = 0;
    let filename;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        });
        page = await browser.newPage();

        filename = `benchmarks-results/${slug}/edit-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/demos/${context}/${element.slug}`, {
            waitUntil: 'load'
        });

        await page.setViewport({
            width: 800,
            height: 6000
        });

        await page.waitFor('my-todo');

        const inputHandle = await page.evaluateHandle(selector);

        for (let j = 0; j < numberOfModifications; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        // Puppeteer doesn't handle easily shadow dom childs -> https://github.com/GoogleChrome/puppeteer/issues/858
        // Edit todos with mouse click and x/y coordinates

        let incrementY = 364;
        for (let j = 0; j < numberOfModifications; j++) {
            await page.mouse.click(140, incrementY);
            incrementY += 59;
        }

        await page.tracing.stop();

        average += processRawData(filename, i);

        await browser.close();
    }

    return average / numberOftests;
}

async function benchTti(element, context) {
    const browser = await puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true
    });
    const page = await browser.newPage();

    await page.goto(`${LOCALHOST}/demos/${context}/${element.slug}`);
    const lighthouseMetrics = await gatherLighthouseMetrics(page, perfConfig);
    const firstInteractive = parseInt(
        lighthouseMetrics.audits['first-interactive']['rawValue'],
        10
    );

    await browser.close();

    return firstInteractive;
}

module.exports = {
    gatherLighthouseMetrics,
    benchPageLoad,
    benchCreate,
    benchDelete,
    benchEdit,
    benchTti
};
