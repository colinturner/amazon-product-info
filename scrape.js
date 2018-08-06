const puppeteer = require('puppeteer');
const {
  scrapeString,
  extractCategoryAndRank
} = require('./helpers');
const {
  NAME_ELEMENT,
  NAME_SELECTOR,
  DIMENSIONS_ELEMENT,
  DIMENSIONS_SELECTOR,
  CATEGORY_AND_RANK_ELEMENT,
  RANK,
  USER_AGENT,
  AMAZON_URL,
  ASIN,
  ERROR_MESSAGE,
} = require('./constants');

(async function main() {
  try {
    // Navigate to Amazon page in headless browser
    const browser = await puppeteer.launch({
      headless: true
    });
    const page = await browser.newPage();
    page.setUserAgent(USER_AGENT);

    await page.goto(`${AMAZON_URL}${ASIN}`);
    await page.waitForSelector(DIMENSIONS_SELECTOR);
    await page.waitForSelector(NAME_SELECTOR);

    // Scrape data as strings
    const nameString = await scrapeString(NAME_ELEMENT, page);
    const dimensionsString = await scrapeString(DIMENSIONS_ELEMENT, page);
    const categoryAndRankString = await scrapeString(CATEGORY_AND_RANK_ELEMENT, page);

    // Format strings into JSON
    const product = {
      name: nameString,
      dimensions: dimensionsString,
      rank: {},
    };
    extractCategoryAndRank(categoryAndRankString, product[RANK]);

    console.log(product);

  } catch (e) {
    console.log(ERROR_MESSAGE, e);
  }
})();