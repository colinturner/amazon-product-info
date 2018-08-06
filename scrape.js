const scrapeString = require('./helpers').scrapeString;
const extractCategoryAndRank = require('./helpers').extractCategoryAndRank;
const puppeteer = require('puppeteer');
const NAME_SELECTOR = require('./constants').NAME_SELECTOR;
const DIMENSIONS_SELECTOR = require('./constants').DIMENSIONS_SELECTOR;
const CATEGORY_AND_RANK_SELECTOR = require('./constants').CATEGORY_AND_RANK_SELECTOR;


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
    const nameString = await scrapeString(NAME_SELECTOR, page);
    const dimensionsString = await scrapeString(DIMENSIONS_SELECTOR, page);
    const categoryAndRankString = await scrapeString(CATEGORY_AND_RANK_SELECTOR, page);

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