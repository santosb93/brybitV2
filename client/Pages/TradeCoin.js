import React, { useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import {createChart} from 'lightweight-charts';
import { bryBitReducer } from '../context/context';
import * as types from '../constants/actionTypes';
import "../css/TradeCoin.scss";

const TradeCoin = () => {
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

  // get the dispatcher from the bryBitReducer
  const {state,dispatch} = useContext(bryBitReducer);
  // on render, get ohlc data, get token, connect socket 
  useEffect( () => {
    //fetch ohlc data
    console.log('fetching ohlc');
    fetch(`/coins/ohlc/${id}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const chartProperties = {
        width: 600,
        height: 400,
        timeScale:{
          timeVisibile: true,
          secondsVisibile: true,
        },
      }
      console.log(data.ohlc)
      const domElem = document.querySelector('#chart')
      const chart = createChart(domElem, chartProperties);
      candleSeries = chart.addCandlestickSeries();
      candleSeries.setData(data.ohlc);
      dispatch({type: types.UPDATE_OHLC_COIN, payload: data.ohlc})
      }
    )
    .catch((err) => console.log("error", err))

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
      console.log(candleData);
      // update the chart
      candleSeries.update(candleData);
      // update candleData state to cause rerender
      dispatch(types.UPDATE_LIVE_CANDLE, candleData);
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
          <h3>Available Brybits: 10000</h3>
         </div>
         <div className = "container container--buttons">
          <button id = "short">Short</button>
          <button id = "long">Long</button>
        </div>
      </div>
      <div id = "TradeCoin_info">
        <div id = 'chart'></div>
        <div className = "container container--active_trade">
          <h2>Active Trade</h2>
         </div>
      </div>
    </section>
  );
};

export default TradeCoin;