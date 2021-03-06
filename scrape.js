const puppeteer = require('puppeteer');
const {
  scrapeString,
  extractCategoryAndRank,
  openAmazonProductPage,
} = require('./helpers');
const {
  NAME_ELEMENT,
  NAME_SELECTOR,
  DIMENSIONS_ELEMENT,
  DIMENSIONS_SELECTOR,
  CATEGORY_AND_RANK_ELEMENT,
  RANK,
  USER_AGENT,
  ASIN,
  ERROR_MESSAGE,
} = require('./constants');

const scrape = async (asin = ASIN) => {
  try {
    // Open headless browser
    const browser = await puppeteer.launch({
      headless: true
    });
    const page = await browser.newPage();
    page.setUserAgent(USER_AGENT);

    // Navigate to Amazon product page in headless browser
    await openAmazonProductPage(asin, page);
    await page.waitForSelector(DIMENSIONS_SELECTOR);
    await page.waitForSelector(NAME_SELECTOR);

    // Scrape relevant data as strings
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

    // Print and return JSON
    console.log(product);
    browser.close();
    return product;

    // Handle errors
  } catch (e) {
    console.log(ERROR_MESSAGE, e);
  }
};

scrape();
scrape('B073QPMFVJ');
scrape('B06ZYBTLW8');