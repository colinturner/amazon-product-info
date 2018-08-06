const test1 = require('./helpers').test1;
const extractCategoryAndRank = require('./helpers').extractCategoryAndRank;
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');


(async function main () {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36');

    await page.goto('https://www.amazon.com/dp/B002QYW8LW');
    await page.waitForSelector('.zg_hrsr_rank');
    await page.waitForSelector('.size-weight');

    const ranks = await page.$$('.zg_hrsr_rank');

    const product = {
      name: '',
      rank: {},
      dimensions: '',
    };

    const nameString = await page.evaluate(
      () => [document.querySelector('#productTitle')].map(elem => elem.innerText).pop()
    );

    const categoryAndRankString = await page.evaluate(
      () => [document.querySelector('#SalesRank > td.value')].map(elem => elem.innerText).pop()
    );

    const dimensionsString = await page.evaluate(
      () => [document.querySelector('tbody > tr.size-weight:nth-child(2) > td.value')].map(elem => elem.innerText).pop()
    )

    extractCategoryAndRank(categoryAndRankString, product['rank']);
    console.log('type', typeof dimensionsString);
    product['dimensions'] = dimensionsString;
    product['name'] = nameString;

    console.log(product);

  } catch (e) {
    console.log('our error', e);
  }
})();