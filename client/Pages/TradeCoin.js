import React, { useContext, useEffect, useRef } from 'react';
import { useHref, useParams } from 'react-router';
import {createChart} from 'lightweight-charts';
import { bryBitReducer } from '../context/context';
import * as types from '../constants/actionTypes';
import "../css/TradeCoin.scss";

const TradeCoin = () => {
  // get the param and assign it a pair for the live data
  const coinOptions = useRef({
    BITCOIN: "XBT/USD",
    ETHEREUM: 'XETHZUSD',
    LITECOIN: 'XLTCZUSD',
    CARDANO: 'ADAUSD',
    'SHIBA-INU': 'SHIBUSD',
  })
  // save variables with useRef
  let socket = useRef(null);
  let candleSeries = useRef(null);
  const {id} = useParams()
  let keepId = useRef(id);

  // get the dispatcher from the bryBitReducer
  const {dispatch} = useContext(bryBitReducer);
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
      console.log(JSON.parse(res.data))
      const cData = JSON.parse(res.data)
      if (cData[0] === 328) {
        const candleData = {
          time: Math.floor(parseInt(cData[1][1])),
          open: parseFloat(cData[1][2]).toFixed(2),
          high: parseFloat(cData[1][3]).toFixed(2),
          low: parseFloat(cData[1][4]).toFixed(2),
          close: parseFloat(cData[1][5]).toFixed(2)
        }
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
      </div>
      <div id = "TradeCoin_info">
        <div id = 'chart'></div>
      </div>
    </section>
  );
};

export default TradeCoin;