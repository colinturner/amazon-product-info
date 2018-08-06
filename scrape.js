const scrapeString = require('./helpers').scrapeString;
const extractCategoryAndRank = require('./helpers').extractCategoryAndRank;
// const cheerio = require('cheerio');
const puppeteer = require('puppeteer');


(async function main () {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36');

    await page.goto('https://www.amazon.com/dp/B002QYW8LW');
    // await page.waitForSelector('.zg_hrsr_rank');
    await page.waitForSelector('.size-weight');
    await page.waitForSelector('#productTitle');

    // const ranks = await page.$$('.zg_hrsr_rank');

    let product = {
      name: '',
      rank: {},
      dimensions: '',
    };

    // Scrape data as strings
    const nameString = await scrapeString('#productTitle', page);
    const categoryAndRankString = await scrapeString('#SalesRank > td.value', page);
    const dimensionsString = await scrapeString('tbody > tr.size-weight:nth-child(2) > td.value', page);

    // Format strings into JSON
    extractCategoryAndRank(categoryAndRankString, product['rank']);
    product['dimensions'] = dimensionsString;
    product['name'] = nameString;

    console.log(product);

  } catch (e) {
    console.log('our error', e);
  }
})();