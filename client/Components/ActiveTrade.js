import React, { useContext, useEffect, useRef, useState } from 'react';
import { bryBitReducer } from '../context/context';
import '../css/ActiveTrade.scss';

const ActiveTrade = ({orderValue, orderMargin, orderType}) => {

  // get the orderValue, convert to a number
  orderValue = parseInt(orderValue);
  // get the orderMargin convert to a number
  orderMargin = parseInt(orderMargin);
  // get the state from the bryBitreducer
  const {state} = useContext(bryBitReducer);
  // store the orderPrice
  let orderPrice = useRef(state.liveCandle.close);
  // convert the current price to a number
  orderPrice.current = parseInt(orderPrice.current);
 // calculate the order weight
 const orderWeight = parseFloat((orderValue * orderMargin) / orderPrice.current).toFixed(2);
 // calculate the profit loss and liquidation price for a long
 let profitLoss = 0;
 let liquidationPrice = 0;
 //calculate profitLoss for trade types long
 if (orderType === 'long'){
  profitLoss = Math.floor((parseInt(state.liveCandle.close) - orderPrice.current) * orderWeight);
  liquidationPrice = (orderPrice.current - orderValue/orderWeight).toFixed(2);
 }
 //calculate profiteLoss for trade types short
 if (orderType === 'short'){
   profitLoss = Math.floor((orderPrice.current - parseInt(state.liveCandle.close)) * orderWeight);
   liquidationPrice = ((orderValue/orderWeight) + orderPrice.current).toFixed(2);
 }


  //console.log('state', state);
  return (
   <section id = "active_trade">
     <div className = 'tradeStats'>
      <div>
        <label htmlFor= 'profitLoss'>Profit/Loss</label>
        <p id = 'profitLoss'>{profitLoss + ' BryBits'}</p>
      </div>
      <div>
        <label htmlFor= 'activeTradeType'>Order Type</label>
        <p id = 'activeTradeType'>{orderType}</p>
      </div>
      <div>
        <label htmlFor= 'activeTradeMargin'>Order Margin</label>
        <p id = 'activeTradeMargin'>{orderMargin}</p>
      </div>
      <div>
        <label htmlFor= 'activeTradeValue'>Order Value</label>
        <p id = 'activeTradeValue'>{orderValue + ' BryBits'}</p>
      </div>
      <div>
        <label htmlFor= 'activeTradePrice'>Order Price</label>
        <p id = 'activeTradePrice'>{orderPrice.current}</p>
      </div>
      <div>
        <label htmlFor= 'activeTradeWeight'>Order Weight</label>
        <p id = 'activeTradeWeight'>{orderWeight}</p>
      </div>
      <div>
        <label htmlFor= 'activeTradeLiquidationPrice'>Liquidation Price</label>
        <p id = 'activeTradeLiquidationPrice'>{liquidationPrice}</p>
      </div>
    </div>
    <button id='closeTrade'>CLOSE TRADE</button>
    </section>
  );
};

// console.log('orderPrice type', orderPrice, typeof orderPrice.current);
// console.log('orderValue', orderValue, typeof orderValue);
// console.log('livePrice', parseInt(state.liveCandle.close), typeof parseInt(state.liveCandle.close))
// console.log('weight', orderWeight, typeof orderWeight);
// console.log('liquidationPrice', liquidationPrice, typeof liquidationPrice);
// console.log('profitLoss', profitLoss, typeof profitLoss);

export default ActiveTrade;