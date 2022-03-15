import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import {createChart} from 'lightweight-charts';
import { bryBitReducer } from '../context/context';
import * as types from '../constants/actionTypes'
import "../css/TradeCoin.scss"
const TradeCoin = () => {
  // get the id from the params of the route
  const {id} = useParams();
  // get the dispatcher from the bryBitReducer
  const {dispatch} = useContext(bryBitReducer);
  // fetch the ohlc
  useEffect( () => {
    console.log('fetching ohlc');
    fetch(`/coins/ohlc/${id}`)
    .then(res => res.json())
    .then(data => {
      const chartProperties = {
        width: 600,
        height: 400,
        timeScale:{
          timeVisibile: true,
          secondsVisibile: false,
        },
      }
      console.log(data.ohlc)
      const domElem = document.querySelector('#chart')
      const chart = createChart(domElem, chartProperties);
      const candleSeries = chart.addCandlestickSeries();
      candleSeries.setData(data.ohlc);
      dispatch({type: types.UPDATE_OHLC_COIN, payload: data.ohlc})
      }
    )
    .catch((err) => console.log("error", err))
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