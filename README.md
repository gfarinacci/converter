# Converter Microservice

This repository contains a microservice. The service allows to convert currencies online, providing a WebAPI endpoint.

The endpoint accepts GET requests with the following parameters:
* **amount**: the amount to convert (e.g. 12.35);
* **srcCurrency**: ISO currency code for the source currency to convert (e.g. EUR);
* **destCurrency**: ISO currency code for the destination currency to convert (e.g. USD);
* **referenceDate**: reference date for the exchange rate, in YYYY-MM-DD format.

The response is a JSON object following this pattern:
```{
  “amount”: 20.23,
  “currency”: ”EUR”
}
```

The exchange rate data are dynamically retrieved from the [ECB](https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml) at project startup.

# How to run the microservice?

You can either run the microservice on your computer or use the dockerized version.

In order to run the microservice on your computer Node has to be installed and you should run the following commands:
```cd repository_directory

npm i --save

npm run dev
```

In order to run the microservice on Docker you should run the following commands:
```cd repository_directory

docker build -t converter .

docker run -p 3000:3000 converter
```

# API Usage

In order to use the API you have to call:
```http://localhost:3000/converter/:amount/:srcCurrency/:destCurrency/:referenceDate

(e.g. http://localhost:3000/converter/1/EUR/USD/2020-02-19)
```

In Converter.postman_collection.json there is an example that you can import in Postman.
