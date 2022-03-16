const express = require ('express');
router = express.Router();
const krakenController = require('../controllers/krakenController');

/**
 * route to get individual coin ohlc data
 */
 router.get('/ohlc/:coin', krakenController.getOhlcData, (req, res) => {
  return res.status(200).json({ohlc: res.locals.ohlcData});
});



module.exports = router;