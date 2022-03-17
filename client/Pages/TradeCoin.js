import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import {createChart} from 'lightweight-charts';
import { bryBitReducer } from '../context/context';

import * as types from '../constants/actionTypes';
import "../css/TradeCoin.scss";
import ActiveTrade from '../Components/ActiveTrade';
import Message from '../Components/Message';

const TradeCoin = () => {
  // get the dispatcher from the bryBitReducer
  const {state,dispatch} = useContext(bryBitReducer);
  const [errorMessage, setErrorMessage] = useState([]);
  const [liquidationMessage, setLiquidationMessage] = useState([]);

  // set a state for the active trade
  // get the param and assign it a pair for the live data
  const coinOptions = useRef({
    BITCOIN: "XBT/USD",
    ETHEREUM: 'ETH/USD',
    LITECOIN: 'LTC/USD',
    CARDANO: 'ADA/USD',
    SUSHI: 'SUSHI/USD',
    POLKADOT: 'DOT/USD'
  })
  // save variables with useRef
  let socket = useRef(null);
  let candleSeries = useRef(null);
  const {id} = useParams()
  let keepId = useRef(id);

  const trade = (e) => {
    console.log(e.target.id)
    const orderMargin = document.getElementById('order_margin');
    const orderValue = document.getElementById('order_value');
    // if user is not logged in, return
    if (state.currentUser.username === 'Profile') {
      setErrorMessage([<Message 
        color = 'red'
        id='ErrorMessage' 
        key = {1} 
        message = 'Please login to trade'
      />]);
      return;
    }
    if (orderMargin.value > 100) {
      setErrorMessage([<Message 
        color = 'red'
        id='ErrorMessage' 
        key = {1} 
        message = 'Margin cannot exceed 100'
      />]);
      return;
    }
    // if the orderMargin or orValue inputed is falsy return
    if (!orderMargin.value || !orderValue.value) {
      setErrorMessage([<Message 
        color = 'red' 
        id='ErrorMessage' 
        key = {1} 
        message = 'Invalid Entry. Must enter values for Margin and Market Order'
      />]);
      return;
    }
    // if orderMargin * orderValue is greater than account brybits
    if ((orderMargin.value * orderValue.value) > state.currentUser.brybits) {
      setErrorMessage([<Message id='ErrorMessage' key = {1} color = 'red'
        message = {`Not Enough Brybits. This order is equal to ${orderMargin.value*orderValue.value} brybits`}
      />]);
      return;
    }
    // if user clicks the trade button during an active trade, return
    if (state.activeTrade.length === 1){
      setErrorMessage([<Message color = 'red' id='ErrorMessage' key = {1} message = 'There is an active trade'/>]);
      return;
    }
    // clear the error message if it exists
    if (errorMessage.length === 1) setErrorMessage([]);
    // on click grab the value of margin input, market order, drill down to ActiveTrade
    dispatch({type: types.SET_ACTIVE_TRADE,
      payload: [<ActiveTrade key = {1}
       orderMargin = {orderMargin.value}
       orderValue = {orderValue.value}
       orderType = {e.target.id}
       setLiquidationMessage = {setLiquidationMessage}
      />]});
  }


  // on render, get ohlc data, get token, connect socket 
  useEffect( () => {
    //fetch ohlc data
    console.log('fetching ohlc');
    fetch(`/coins/ohlc/${id}`)
    .then(res => res.json())
    .then(data => {
      const chartProperties = {
        width: 600,
        height: 400,
        timeScale:{
          timeVisibile: true,
          secondsVisibile: true,
        },
      }
      //console.log(data.ohlc)
      const domElem = document.querySelector('#chart')
      const chart = createChart(domElem, chartProperties);
      candleSeries = chart.addCandlestickSeries();
      candleSeries.setData(data.ohlc);
      dispatch({type: types.UPDATE_OHLC_COIN, payload: data.ohlc})
      }
    )
    .catch((err) => console.log("error", err));

    // create a socket for the live data
    socket =  new WebSocket("wss://ws.kraken.com/");
    socket.onopen = () => {
      console.log("SOCKET HAS BEEN OPENED")
      const sendData = {
        event: "subscribe",
        subscription: {
          interval: 5,
          name: "ohlc"
        },
        pair: [coinOptions.current[keepId.current.toUpperCase()]]
      }
      socket.send(JSON.stringify(sendData));
    }
    // on the message with data, create a new candle
    socket.onmessage = (res) => {
      const cData = JSON.parse(res.data)
      //console.log(cData);
      if (parseInt(cData[0])) {
        const candleData = {
          time: Math.floor(parseInt(cData[1][1])),
          open: parseFloat(cData[1][2]).toFixed(2),
          high: parseFloat(cData[1][3]).toFixed(2),
          low: parseFloat(cData[1][4]).toFixed(2),
          close: parseFloat(cData[1][5]).toFixed(2)
        }
      dispatch({type: types.UPDATE_LIVE_CANDLE, payload: candleData});
      // update the chart
      candleSeries.update(candleData);
      }
    }
  },[]);
  return (
    <section className = "TradeCoin">
      <div id = "TradeCoin_form">
        <h1>{id}</h1>
        <div className = "container">
          <h2>Margin</h2>
          <input min = {0} max = {100} type = "number" id = "order_margin" placeholder="Margin (1x, 2x, etc...)"></input>
          <label htmlFor= "order_margin"></label>
         </div>
        <div className = "container">
          <h2>Market Order</h2>
          <input min = {1} max = {10000} type = "number" id = "order_value" placeholder="Order Value"></input>
          <label htmlFor= "">Brybits</label>
          <h3>Available Brybits: {state.currentUser.brybits}</h3>
         </div>
         <div className = "container container--buttons">
          <button id = "short" onClick= {trade}>Short</button>
          <button id = "long" onClick= {trade}>Long</button>
        </div>
        {errorMessage}
      </div>
      <div id = "TradeCoin_info">
        <h3>*LIVE CHART*</h3>
        <div id = 'chart'></div>
        <div className = "container container--active_trade">
          <h2>Active Trade</h2>
            {state.activeTrade}
        </div>
      </div>
    </section>
  );
};

export default TradeCoin;