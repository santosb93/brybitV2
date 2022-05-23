import React, { useContext, useEffect, useRef, useState } from 'react';
import { bryBitReducer } from '../context/context';
import '../css/ActiveTrade.scss';
import * as types from '../constants/actionTypes';
import audioStart from '../../sounds/startTrade.mp3';
import audioUp from '../../sounds/coinUp.mp3';
import audioDown from '../../sounds/coinDown.mp3';

const ActiveTrade = ({
  orderValue,
  orderMargin,
  orderType,
  setLiquidationMessage,
}) => {
  const oldProfitLoss = useRef('');
  useEffect(() => {
    const startTradeAudio = new Audio(audioStart);
    startTradeAudio.play();
  }, []);
  // get the orderValue, convert to a number
  orderValue = parseInt(orderValue);
  // get the orderMargin convert to a number
  orderMargin = parseInt(orderMargin);
  // get the state from the bryBitreducer
  const { state, dispatch } = useContext(bryBitReducer);
  // store the orderPrice
  let orderPrice = useRef(state.liveCandle.close);
  // convert the current price to a number
  orderPrice.current = parseInt(orderPrice.current);
  // calculate the order weight
  const orderWeight = parseFloat(
    (orderValue * orderMargin) / orderPrice.current
  ).toFixed(2);
  // calculate the profit loss and liquidation price for a long
  let profitLoss = 0;
  let liquidationPrice = 0;
  //calculate profitLoss for trade types long
  if (orderType === 'long') {
    profitLoss = Math.floor(
      (parseInt(state.liveCandle.close) - orderPrice.current) * orderWeight
    );
    liquidationPrice = (orderPrice.current - orderValue / orderWeight).toFixed(
      2
    );
    if (liquidationPrice > parseInt(state.liveCandle.close)) {
      console.log(
        'liquidationPrice',
        liquidationPrice,
        typeof liquidationPrice
      );
      console.log(
        'currentPrce ',
        parseInt(state.liveCandle.close),
        typeof liquidationMessage
      );
      alert('Your position has been liquidated');
    }
  }
  //calculate profiteLoss for trade types short
  if (orderType === 'short') {
    profitLoss = Math.floor(
      (orderPrice.current - parseInt(state.liveCandle.close)) * orderWeight
    );
    liquidationPrice = (orderValue / orderWeight + orderPrice.current).toFixed(
      2
    );
    //if the liquidiationPrice is equal to current price, send message and close trade
    if (liquidationPrice < parseInt(state.liveCandle.close)) {
      console.log(
        'liquidationPrice',
        liquidationPrice,
        typeof liquidationPrice
      );
      console.log(
        'currentPrce ',
        parseInt(state.liveCandle.close),
        typeof liquidationMessage
      );
      alert('Your position has been liquidated');
    }
  }
  // if profitLoss.current is '', assign profit loss to current profitLoss
  if (oldProfitLoss.current === '') oldProfitLoss.current = profitLoss;
  // if oldProfitLoss > profitloss play coin up sound
  else if (oldProfitLoss.current > profitLoss) {
    const coinUpAudio = new Audio(audioUp);
    coinUpAudio.play();
  }
  // if oldProfitLoss < profitLoss play coin down sound
  else if (oldProfitLoss.current < profitLoss) {
    const coinDownAudio = new Audio(audioDown);
    coinDownAudio.play();
  }
  oldProfitLoss.current = profitLoss;
  const close = () => {
    console.log(state);
    console.log(state.currentUser.brybits);
    console.log(profitLoss + state.currentUser.brybits);
    const update = profitLoss + state.currentUser.brybits;
    const body = {
      username: state.currentUser.username,
      brybits: update,
    };
    // update the user with their new total brybits
    fetch('/users/updateUser', {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: types.SET_ACTIVE_TRADE, payload: [] });
      })
      .catch((err) => console.log(err));
  };

  //console.log('state', state);
  return (
    <section id='active_trade'>
      <div className='tradeStats'>
        <div>
          <label htmlFor='profitLoss'>Profit/Loss</label>
          <p id='profitLoss'>{profitLoss + ' BryBits'}</p>
        </div>
        <div>
          <label htmlFor='activeTradeType'>Order Type</label>
          <p id='activeTradeType'>{orderType}</p>
        </div>
        <div>
          <label htmlFor='activeTradeMargin'>Order Margin</label>
          <p id='activeTradeMargin'>{orderMargin}</p>
        </div>
        <div>
          <label htmlFor='activeTradeValue'>Order Value</label>
          <p id='activeTradeValue'>{orderValue + ' BryBits'}</p>
        </div>
        <div>
          <label htmlFor='activeTradePrice'>Order Price</label>
          <p id='activeTradePrice'>{orderPrice.current}</p>
        </div>
        <div>
          <label htmlFor='activeTradeWeight'>Order Weight</label>
          <p id='activeTradeWeight'>{orderWeight}</p>
        </div>
        <div>
          <label htmlFor='activeTradeLiquidationPrice'>Liquidation Price</label>
          <p id='activeTradeLiquidationPrice'>{liquidationPrice}</p>
        </div>
      </div>
      <button id='closeTrade' onClick={close}>
        CLOSE TRADE
      </button>
    </section>
  );
};

export default ActiveTrade;
