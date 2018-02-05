const puppeteer = require('puppeteer'),
    fs = require('fs-extra');

fs.ensureDirSync('benchmarks/native-shadow-dom');
fs.ensureDirSync('benchmarks/polymer');
fs.ensureDirSync('benchmarks/stencil');
fs.ensureDirSync('benchmarks/angular-elements');
fs.ensureDirSync('benchmarks/vue');

puppeteer.launch({
    headless: true
}).then(async browser => {
    let page;
    
    for (let i = 0; i<5; i++) {
        page = await browser.newPage();
        await page.tracing.start({
            path: `benchmarks/native-shadow-dom/load-page_native-shadow-dom_${i}.json`
        });
        await page.goto('http://127.0.0.1:8080/native-shadow-dom/index.html');
        await page.tracing.stop();
    
        await page.close();
    }

    for (let i = 0; i<5; i++) {
        page = await browser.newPage();
        await page.tracing.start({
            path: `benchmarks/polymer/load-page_polymer_${i}.json`
        });
        await page.goto('http://127.0.0.1:8080/polymer/build/es6-bundled/index.html');
        await page.tracing.stop();
    
        await page.close();
    }

    for (let i = 0; i<5; i++) {
        page = await browser.newPage();
        await page.tracing.start({
            path: `benchmarks/stencil/load-page_stencil_${i}.json`
        });
        await page.goto('http://127.0.0.1:8080/stencil/www/index.html');
        await page.tracing.stop();
    
        await page.close();
    }

    for (let i = 0; i<5; i++) {
        page = await browser.newPage();
        await page.tracing.start({
            path: `benchmarks/angular-elements/load-page_angular-elements_${i}.json`
        });
        await page.goto('http://127.0.0.1:8080/angular-elements/index.html');
        await page.tracing.stop();
    
        await page.close();
    }

    for (let i = 0; i<5; i++) {
        page = await browser.newPage();
        await page.tracing.start({
            path: `benchmarks/vue/load-page_vue_${i}.json`
        });
        await page.goto('http://127.0.0.1:8080/vue-todo/index.html');
        await page.tracing.stop();
    
        await page.close();
    }

    browser.close();
});