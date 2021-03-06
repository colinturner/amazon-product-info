const expect = require('chai').expect
const extractCategoryAndRank = require('../helpers').extractCategoryAndRank;
const scrapeString = require('../helpers').scrapeString;

describe('Test suite', () => {
  it('should test assertions', () => {
    expect(true).to.equal(true);
  })
})

describe('Helper functions', () => {
  describe('extractCategoryAndRank', () => {
    it('should format web-scraped category/rank string into JSON', () => {
      const webScrapedString1 = '#9 in Baby (See top 100)\n#1 in Baby > Baby Care > Health\n#2 in Baby > Baby Care > Pacifiers, Teethers & Teething Relief > Teethers\n';
      const desiredFormat1 = {
        rank: {
          Baby: 9,
          'Baby > Baby Care > Health': 1,
          'Baby > Baby Care > Pacifiers, Teethers & Teething Relief > Teethers': 2,
        }
      };
      let productJSON = {
        rank: {}
      };
      extractCategoryAndRank(webScrapedString1, productJSON['rank']);
      expect(productJSON).to.deep.equal(desiredFormat1);

      productJSON = {
        rank: {}
      };
      const webScrapedString2 = '#411 in Baby (See top 100)\n#3 in Industrial & Scientific > Professional Medical Supplies > Diagnostics & Screening > Thermometers > Oral\n';
      const desiredFormat2 = {
        rank: {
          Baby: 411,
          'Industrial & Scientific > Professional Medical Supplies > Diagnostics & Screening > Thermometers > Oral': 3,
        }
      };
      extractCategoryAndRank(webScrapedString2, productJSON['rank']);
      expect(productJSON).to.deep.equal(desiredFormat2);
    })
  });

  xdescribe('scrapeString', () => {
    it('should web-scrape product data as string', () => {

    });
  });

  xdescribe('extractDimensions', () => {
    it('should format web-scraped dimensions string into JSON', () => {
      const webScrapedString = '4.3 x 0.4 x 7.9 inches';
      const productJSON = {};
      const desiredFormat = {
        dimensions: '4.3 x 0.4 x 7.9 inches'
      }
      extractDimensions(webScrapedString, productJSON);
      expect(productJSON).to.deep.equal(desiredFormat);
    });
  })
});