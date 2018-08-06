const extractCategoryAndRank = (str, destination) => {
  str
  .replace(new RegExp(String.fromCharCode(160),'g'), ' ')
  .replace(/\s*?\(.*?\)|#/g,'')
  .split('\n')
  .filter(val => val.length)
  .map(val => val.split(' in '))
  .forEach(val => destination[val[1]] = Number(val[0]))
}

module.exports = { extractCategoryAndRank };