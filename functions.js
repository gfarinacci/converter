const fs = require('fs')
const xmlReader = require('xml-reader')

const getExchangeRates = (day) => {
  const xml = fs.readFileSync('data.xml', 'utf8')
  const parsedXml = xmlReader.parseSync(xml)

  return parsedXml
          .children
          .filter(obj => obj.name === 'Cube')[0]
          .children
          .filter(obj => obj.attributes.time === day)[0]
}

const getExchangeRate = (currency, exchangeRates) => {
  return exchangeRates
      .children
      .filter(obj => obj.attributes.currency === currency)[0]
      .attributes
      .rate
}

const convertSrcToEUR = (amount, srcCurrency, exchangeRates) => {
  if (srcCurrency === 'EUR') {
    return parseFloat(amount)
  }
  const exchangeRate = getExchangeRate(srcCurrency, exchangeRates)

  return amount/exchangeRate
}

const convertEURToDest = (amount, destCurrency, exchangeRates) => {
  if (destCurrency === 'EUR') {
    return parseFloat(amount)
  }
  const exchangeRate = getExchangeRate(destCurrency, exchangeRates)

  return amount*exchangeRate
}

module.exports = {
  getExchangeRates,
  convertSrcToEUR,
  convertEURToDest
}
