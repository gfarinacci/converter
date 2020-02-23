const express = require('express')
const axios = require('axios')
const fs = require('fs')

const port = 3000

const { getExchangeRates, convertSrcToEUR, convertEURToDest } = require('./functions')

const app = express()

axios.get(`https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml`)
  .then((response) => {
    fs.writeFileSync('data.xml', response.data)

    app.get('/converter/:amount/:srcCurrency/:destCurrency/:referenceDate', (req, res) => {
      const exchangeRates = getExchangeRates(req.params.referenceDate)

      const convertedAmount = convertEURToDest(
                              convertSrcToEUR(req.params.amount, req.params.srcCurrency, exchangeRates),
                              req.params.destCurrency,
                              exchangeRates
                          )

      res.json({
        amount: convertedAmount,
        currency: req.params.destCurrency
      })
    })

    app.listen(port, () => console.log(`App listening on port ${port}!`))
  })
