const puppeteer = require('puppeteer'),
    fs = require('fs-extra'),
    DevtoolsTimelineModel = require('devtools-timeline-model');

fs.ensureDirSync('benchmarks-results/native-shadow-dom');
fs.ensureDirSync('benchmarks-results/native-shadow-dom_lit-html');
fs.ensureDirSync('benchmarks-results/polymer');
fs.ensureDirSync('benchmarks-results/polymer3');
fs.ensureDirSync('benchmarks-results/stencil');
fs.ensureDirSync('benchmarks-results/stencil-prerendered');
//fs.ensureDirSync('benchmarks-results/angular-elements');
fs.ensureDirSync('benchmarks-results/vue');

const numberOftests = 10,
    numberOfCreation = 50,
    selector = `document.querySelector('my-todo').shadowRoot.querySelector('todo-input').shadowRoot.querySelector('input')`;

const LOCALHOST = 'https://localhost:3001';

let browser;
let page;
let average = 0;
let filename;

let processRawData = (filename, i) => {
    let events = require('fs').readFileSync(filename, 'utf8');
    try {
        var model = new DevtoolsTimelineModel(events);
        var topDown = model.topDown();
        average += topDown.totalTime;
        console.log(`Top down tree total time ${i}: ${topDown.totalTime}`);
    } catch (e) {
        //console.log(e);
    }
};

(async () => {
    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true });
        page = await browser.newPage();

        filename = `benchmarks-results/native-shadow-dom/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/native-shadow-dom/dist/index.html`);

        await page.tracing.start({
            path: filename
        });

        const inputHandle = await page.evaluateHandle(selector);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for native : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true });
        page = await browser.newPage();

        filename = `benchmarks-results/native-shadow-dom_lit-html/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/native-shadow-dom_lit-html/dist/index.html`);

        await page.tracing.start({
            path: filename
        });

        const inputHandle = await page.evaluateHandle(selector);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for native + lit-html : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true });
        page = await browser.newPage();

        filename = `benchmarks-results/polymer/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/polymer/build/es6-bundled/index.html`);

        await page.tracing.start({
            path: filename
        });

        const inputHandle = await page.evaluateHandle(selector);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Polymer : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true });
        page = await browser.newPage();

        filename = `benchmarks-results/polymer3/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/polymer3/build/es6-bundled/index.html`);

        await page.tracing.start({
            path: filename
        });

        const inputHandle = await page.evaluateHandle(selector);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Polymer 3 : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true });
        page = await browser.newPage();

        filename = `benchmarks-results/stencil/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/stencil/www/index.html`);

        await page.tracing.start({
            path: filename
        });

        const inputHandle = await page.evaluateHandle(`document.querySelector('todo-input').querySelector('input')`);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Stencil without PR : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true });
        page = await browser.newPage();

        filename = `benchmarks-results/stencil-prerendered/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/stencil/www-prerendered/index.html`);

        await page.tracing.start({
            path: filename
        });

        const inputHandle = await page.evaluateHandle(`document.querySelector('todo-input').querySelector('input')`);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Stencil with PR: ${Math.ceil(average)} ms\n`);

    /*average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true })
        page = await browser.newPage();

        filename = `benchmarks-results/angular-elements/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/angular-elements/dist/index.html`);

        await page.tracing.start({
            path: filename
        });
        
        const inputHandle = await page.evaluateHandle(selector);

        for (let j = 0; j<numberOfCreation; j++) {            
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Angular elements : ${Math.ceil(average)} ms\n`);*/

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true });
        page = await browser.newPage();

        filename = `benchmarks-results/vue/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/vue.js/dist/index.html`);

        await page.tracing.start({
            path: filename
        });

        const inputHandle = await page.evaluateHandle(selector);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Vue : ${Math.ceil(average)} ms\n`);
})();
