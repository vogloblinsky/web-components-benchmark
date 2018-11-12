const puppeteer = require('puppeteer'),
    fs = require('fs-extra'),
    DevtoolsTimelineModel = require('devtools-timeline-model');

fs.ensureDirSync('benchmarks-results/native-shadow-dom');
fs.ensureDirSync('benchmarks-results/native-shadow-dom_lit-html');
fs.ensureDirSync('benchmarks-results/polymer');
fs.ensureDirSync('benchmarks-results/polymer3');
fs.ensureDirSync('benchmarks-results/stencil');
fs.ensureDirSync('benchmarks-results/stencil-prerendered');
fs.ensureDirSync('benchmarks-results/angular-elements');
fs.ensureDirSync('benchmarks-results/vue.js');
fs.ensureDirSync('benchmarks-results/skatejs-lit-html');
fs.ensureDirSync('benchmarks-results/skatejs-preact');
fs.ensureDirSync('benchmarks-results/svelte');
fs.ensureDirSync('benchmarks-results/lit-element');
fs.ensureDirSync('benchmarks-results/riot');
fs.ensureDirSync('benchmarks-results/slim');
fs.ensureDirSync('benchmarks-results/hyperhtml');
fs.ensureDirSync('benchmarks-results/atomico');
fs.ensureDirSync('benchmarks-results/dojo2');

const numberOftests = 10,
    numberOfCreation = 50,
    selector = `document.querySelector('my-todo').shadowRoot.querySelector('todo-input').shadowRoot.querySelector('input')`;

const LOCALHOST = 'https://localhost:3001';

const resultsFile = '../results/todo-create.json';

let browser;
let page;
let average = 0;
let filename;

let results = {}

let processRawData = (filename, i) => {
    let events = require('fs').readFileSync(filename, 'utf8');
    try {
        var model = new DevtoolsTimelineModel(events);
        var topDown = model.topDown();
        average += topDown.totalTime;
        // console.log(`Top down tree total time ${i}: ${Math.ceil(topDown.totalTime)}`);
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

    results['native'] = Math.ceil(average);

    console.log(`\nAverage time for native : ${Math.ceil(average)} ms\n`);

    /*average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        });
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

    results['lit-html'] = Math.ceil(average);

    console.log(`\nAverage time for native + lit-html : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        });
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

    console.log(`\nAverage time for Polymer : ${Math.ceil(average)} ms\n`);*/

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        });
        page = await browser.newPage();

        filename = `benchmarks-results/polymer3/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/polymer3/build/es6-unbundled/index.html`);

        await page.tracing.start({
            path: filename
        });

        const inputHandle = await page.evaluateHandle(`document.querySelector('todo-app').shadowRoot.querySelector('todo-input').shadowRoot.querySelector('input')`);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    results['polymer-3'] = Math.ceil(average);

    console.log(`\nAverage time for Polymer 3 : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        });
        page = await browser.newPage();

        filename = `benchmarks-results/stencil/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/stencil/www/index.html`, {
            waitUntil: 'domcontentloaded'
        });

        await page.waitFor('#input-submit');

        await page.tracing.start({
            path: filename
        });

        const inputHandle = await page.evaluateHandle(`document.querySelector('#input-submit')`);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    results['stencil'] = Math.ceil(average);

    console.log(`\nAverage time for Stencil without PR : ${Math.ceil(average)} ms\n`);

    /*average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        });
        page = await browser.newPage();

        filename = `benchmarks-results/stencil-prerendered/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/stencil/www-prerendered/index.html`, {
            waitUntil: 'domcontentloaded'
        });

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

    console.log(`\nAverage time for Stencil with PR: ${Math.ceil(average)} ms\n`);*/

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        })
        page = await browser.newPage();

        filename = `benchmarks-results/angular-elements/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/angular-elements/dist/index.html`);

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

    results['angular-elements'] = Math.ceil(average);

    console.log(`\nAverage time for Angular elements : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        });
        page = await browser.newPage();

        filename = `benchmarks-results/vue.js/create-todos_${i}.json`;

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

    results['vue.js'] = Math.ceil(average);

    console.log(`\nAverage time for Vue.js : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        });
        page = await browser.newPage();

        filename = `benchmarks-results/skatejs-lit-html/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/skatejs-lit-html/index.html`);

        await page.tracing.start({
            path: filename
        });

        const inputHandle = await page.evaluateHandle(
            `document.querySelector('todo-app').shadowRoot.querySelector('todo-input').shadowRoot.querySelector('input')`
        );

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    results['skatejs-lithtml'] = Math.ceil(average);

    console.log(`\nAverage time for skatejs + lit-html : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        });
        page = await browser.newPage();

        filename = `benchmarks-results/skatejs-preact/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/skatejs-preact/index.html`);

        await page.tracing.start({
            path: filename
        });

        const inputHandle = await page.evaluateHandle(
            `document.querySelector('todo-app').shadowRoot.querySelector('todo-input').shadowRoot.querySelector('input')`
        );

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    results['skatejs-preact'] = Math.ceil(average);

    console.log(`\nAverage time for skatejs + preact : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        });
        page = await browser.newPage();

        filename = `benchmarks-results/svelte/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/svelte/public/index.html`);

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

    results['svelte'] = Math.ceil(average);

    console.log(`\nAverage time for svelte : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        });
        page = await browser.newPage();

        filename = `benchmarks-results/lit-element/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/lit-element/dist/index.html`);

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

    results['lit-element'] = Math.ceil(average);

    console.log(`\nAverage time for lit-element : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        });
        page = await browser.newPage();

        filename = `benchmarks-results/hyperhtml/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/native-shadow-dom_hyperHTML/dist/index.html`);

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

    results['hyperhtml'] = Math.ceil(average);

    console.log(`\nAverage time for hyperhtml : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        });
        page = await browser.newPage();

        filename = `benchmarks-results/riot/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/riot/dist/index.html`);

        await page.tracing.start({
            path: filename
        });

        const inputHandle = await page.evaluateHandle(`document.querySelector('my-todo todo-input input')`);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    results['riot'] = Math.ceil(average);

    console.log(`\nAverage time for riot : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        });
        page = await browser.newPage();

        filename = `benchmarks-results/slim/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/slim.js/dist/index.html`);

        await page.tracing.start({
            path: filename
        });

        await page.waitFor('my-todo todo-input input');

        const inputHandle = await page.evaluateHandle(`document.querySelector('my-todo todo-input input')`);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    results['slim.js'] = Math.ceil(average);

    console.log(`\nAverage time for slim : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        });
        page = await browser.newPage();

        filename = `benchmarks-results/atomico/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/atomico/public/index.html`);

        await page.tracing.start({
            path: filename
        });

        const inputHandle = await page.evaluateHandle(`document.querySelector('atom-todo').shadowRoot.querySelector('atom-todo-input').shadowRoot.querySelector('input')`);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    results['atomico'] = Math.ceil(average);

    console.log(`\nAverage time for atomico : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        });
        page = await browser.newPage();

        filename = `benchmarks-results/dojo2/create-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/dojo2/output/index.html`);

        await page.tracing.start({
            path: filename
        });

        const inputHandle = await page.evaluateHandle(`document.querySelector('todo-app todo-input input')`);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    results['dojo2'] = Math.ceil(average);

    console.log(`\nAverage time for dojo2 : ${Math.ceil(average)} ms\n`);

    fs.outputJsonSync(resultsFile, results);
})();