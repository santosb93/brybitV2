import React, { useContext, useEffect, useRef, useState } from 'react';
import { bryBitReducer } from '../context/context';
import '../css/ActiveTrade.scss';

const ActiveTrade = ({orderValue, orderMargin}) => {

  orderValue = parseInt(orderValue);
  orderMargin = parseInt(orderMargin);
 const {state} = useContext(bryBitReducer);
 let orderPrice = useRef(state.liveCandle.close);

 orderPrice.current = parseInt(orderPrice.current);
 console.log('orderPrice type', orderPrice, typeof orderPrice.current);
 const orderWeight = parseFloat((orderValue * orderMargin) / orderPrice.current);
 console.log('orderValue', orderValue, typeof orderValue);
 console.log('livePrice', parseInt(state.liveCandle.close), typeof parseInt(state.liveCandle.close))
 console.log('weight', orderWeight, typeof orderWeight);
 const profitLoss = Math.floor((parseInt(state.liveCandle.close) - orderPrice.current) * orderWeight);
 const liquidationPrice = (orderPrice.current - orderValue/orderWeight);
 console.log('liquidationPrice', liquidationPrice, typeof liquidationPrice);
 console.log('profitLoss', profitLoss, typeof profitLoss);
  //console.log('state', state);
  return (
   <section id = "active_trade">
     <div className = 'tradeStats'>
      <div>
        <label htmlFor= 'profitLoss'>Profit/Loss</label>
        <p id = 'profitLoss'>{profitLoss + ' BryBits'}</p>
      </div>
      <div>
        <label htmlFor= 'activeTradeMargin'>Order Margin</label>
        <p id = 'activeTradeMargin'>{orderMargin}</p>
      </div>
      <div>
        <label htmlFor= 'activeTradeValue'>Order Value</label>
        <p id = 'activeTradeValue'>{orderValue}</p>
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

export default ActiveTrade;