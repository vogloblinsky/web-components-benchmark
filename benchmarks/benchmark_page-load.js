const puppeteer = require('puppeteer'),
    fs = require('fs-extra'),
    DevtoolsTimelineModel = require('devtools-timeline-model');

fs.ensureDirSync('benchmarks-results/native-shadow-dom');
fs.ensureDirSync('benchmarks-results/polymer');
fs.ensureDirSync('benchmarks-results/stencil');
fs.ensureDirSync('benchmarks-results/angular-elements');
fs.ensureDirSync('benchmarks-results/vue');

const numberOftests = 10;

let browser;
let page;
let average = 0;
let filename;

let processRawData = (filename, i) => {
    let events = require('fs').readFileSync(filename, 'utf8');
    var model = new DevtoolsTimelineModel(events);

    var topDown = model.topDown();
    average += topDown.totalTime;

    console.log(`Top down tree total time ${i}: ${topDown.totalTime}`);
}

(async () => {
    
    for (let i = 0; i<numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
        
        filename = `benchmarks-results/native-shadow-dom/load-page_native-shadow-dom_${i}.json`;

        await page.tracing.start({
            path: filename
        });
        await page.goto('http://localhost:8080/native-shadow-dom/dist/index.html');
        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }
    
    average = average / numberOftests;

    console.log(`\nAverage time for native : ${average} ms\n`);

    average = 0;

    for (let i = 0; i<numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();

        filename = `benchmarks-results/polymer/load-page_polymer_${i}.json`;

        await page.tracing.start({
            path: filename
        });
        await page.goto('http://127.0.0.1:8080/polymer/build/es6-bundled/index.html');
        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Polymer : ${average} ms\n`);

    average = 0;

    for (let i = 0; i<numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();

        filename = `benchmarks-results/stencil/load-page_stencil_${i}.json`;

        await page.tracing.start({
            path: filename
        });
        await page.goto('http://127.0.0.1:8080/stencil/www/index.html');
        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Stencil : ${average} ms\n`);

    average = 0;

    for (let i = 0; i<numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true })
        page = await browser.newPage();

        filename = `benchmarks-results/angular-elements/load-page_angular-elements_${i}.json`;

        await page.tracing.start({
            path: filename
        });
        await page.goto('http://127.0.0.1:8080/angular-elements/dist/index.html');
        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Angular elements : ${average} ms\n`);

    average = 0;

    for (let i = 0; i<numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true })
        page = await browser.newPage();

        filename = `benchmarks-results/vue/load-page_vue_${i}.json`;

        await page.tracing.start({
            path: filename
        });
        await page.goto('http://127.0.0.1:8080/vue.js/dist/index.html');
        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Vue : ${average} ms\n`);
    
})();