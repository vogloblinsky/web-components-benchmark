const puppeteer = require('puppeteer');

let browser;

module.exports = async function scrapStars(url) {
    let starts;
    if (url) {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true
        });
        page = await browser.newPage();
        await page.goto(url);
        stars = await page.evaluate((sel) => {
            return document.querySelectorAll(sel)[1].innerText;
        }, '.social-count');
        console.log(stars);
        browser.close();
    } else {
        stars = 0;
    }
};