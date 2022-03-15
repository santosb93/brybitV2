const types = require('../constants/things');
const KrakenClient = require('kraken-api');
const kraken = new KrakenClient(types.KRAKEN_API_KEY, types.KRAKEN_SECRET_KEY);

const krakenController = {};

// create a coinOptions object to map to the coin wanted
const coinOptions = {
  BITCOIN: 'XXBTZUSD',
  ETHEREUM: 'XETHZUSD',
  LITECOIN: 'XLTCZUSD',
  CARDANO: 'ADAUSD',
  'SHIBA-INU': 'SHIBUSD',
  

};


krakenController.getOhlcData = async (req, res, next) => {
  console.log('trying to get OHLC data');
  try {
    // calculate the date 24 hours from now
    const date = Math.floor(Date.now()/1000) - 86400;
    // create the options for the request
    const dataOptions = {
      pair: coinOptions[req.params.coin.toUpperCase()],
      interval: 5,
      since: date
    }
    const krakenRes = await kraken.api('OHLC', dataOptions);
    const coinArray = krakenRes.result[coinOptions[req.params.coin.toUpperCase()]];
    console.log('storing OHLC data');
     res.locals.ohlcData = coinArray.map((el) => {
       return ({
          time: el[0],
          open: parseFloat(el[1]),
          high: parseFloat(el[2]),
          low: parseFloat(el[3]),
          close: parseFloat(el[4])
       })
     });
  
    return next();
  } catch (err) {
    return next({
      log: "error in krakenController.getOhlcData",
      message: {error: err},
    })

  }
}


module.exports = krakenController;