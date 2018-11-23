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
fs.ensureDirSync('benchmarks-results/skatejs-lit-html');
fs.ensureDirSync('benchmarks-results/skatejs-preact');
fs.ensureDirSync('benchmarks-results/svelte');
fs.ensureDirSync('benchmarks-results/lit-element');

const numberOftests = 10,
    numberOfCreation = 50,
    selectorInput = `document.querySelector('my-todo').shadowRoot.querySelector('todo-input').shadowRoot.querySelector('input')`,
    selectorButton = `document.querySelector('my-todo').shadowRoot.querySelector('todo-item').shadowRoot.querySelector('button')`;

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
        console.log(`Top down tree total time ${i}: ${Math.ceil(topDown.totalTime)}`);
    } catch (e) {
        //console.log(e);
    }
};

(async () => {
    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        });
        page = await browser.newPage();

        filename = `benchmarks-results/native-shadow-dom/delete-todos_${i}.json`;

        await page.goto('http://localhost:3000/native-shadow-dom/dist/index.html');

        await page.setViewport({
            width: 800,
            height: 6000
        });

        const inputHandle = await page.evaluateHandle(selectorInput);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        for (let j = 0; j < numberOfCreation; j++) {
            // const buttonHandle = await page.evaluateHandle(selectorButton);
            // await buttonHandle.click();
            await page.mouse.click(646, 362);
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for native : ${Math.ceil(average)} ms\n`);


})();