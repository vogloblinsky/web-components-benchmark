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
}

(async () => {   

   

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true })
        page = await browser.newPage();

        filename = `benchmarks-results/skatejs-lit-html/delete-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/skatejs-lit-html/index.html`);

        const inputHandle = await page.evaluateHandle(`document.querySelector('todo-app').shadowRoot.querySelector('todo-input').shadowRoot.querySelector('input')`);

        for (let j = 0; j<numberOfCreation; j++) {            
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        for (let j = 0; j<numberOfCreation; j++) {
            try {
                const buttonHandle = await page.evaluateHandle(`document.querySelector('todo-app').shadowRoot.querySelector('todo-item').shadowRoot.querySelector('button')`);
                if (buttonHandle && buttonHandle.click) {
                    await buttonHandle.click();
                }
            } catch(e) {}
        }

        await page.tracing.stop();

        processRawData(filename, i);

        //await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for skatejs + lit-html : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true })
        page = await browser.newPage();

        filename = `benchmarks-results/skatejs-preact/delete-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/skatejs-preact/index.html`);

        const inputHandle = await page.evaluateHandle(`document.querySelector('todo-app').shadowRoot.querySelector('todo-input').shadowRoot.querySelector('input')`);

        for (let j = 0; j<numberOfCreation; j++) {            
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        for (let j = 0; j<numberOfCreation; j++) {
            try {
                const buttonHandle = await page.evaluateHandle(`document.querySelector('todo-app').shadowRoot.querySelector('todo-item').shadowRoot.querySelector('button')`);
                if (buttonHandle && buttonHandle.click) {
                    await buttonHandle.click();
                }
            } catch(e) {}
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for skatejs + preact : ${Math.ceil(average)} ms\n`);
    
})();