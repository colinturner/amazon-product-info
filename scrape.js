const scrapeString = require('./helpers').scrapeString;
const extractCategoryAndRank = require('./helpers').extractCategoryAndRank;
const puppeteer = require('puppeteer');


(async function main () {
  try {
    // Navigate to Amazon page in headless browser
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36');

    await page.goto('https://www.amazon.com/dp/B002QYW8LW');
    await page.waitForSelector('.size-weight');
    await page.waitForSelector('#productTitle');

    // Scrape data as strings
    const nameString = await scrapeString('#productTitle', page);
    const categoryAndRankString = await scrapeString('#SalesRank > td.value', page);
    const dimensionsString = await scrapeString('tbody > tr.size-weight:nth-child(2) > td.value', page);

    // Format strings into JSON
    const product = {
      name: nameString,
      dimensions: dimensionsString,
      rank: {},
    };
    extractCategoryAndRank(categoryAndRankString, product['rank']);

    console.log(product);

  } catch (e) {
    console.log('our error', e);
  }
})();