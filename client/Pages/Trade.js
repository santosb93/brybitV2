import React, { useContext } from 'react';
import Coin from '../Components/Coin';
import { bryBitReducer } from '../context/context';
import '../css/Trade.scss'

const Trade = () => {
  const {state} = useContext(bryBitReducer);
  console.log(state);
  return (
    <section id = 'trade'>
      { state.marketList.map((coin) => (
          <Coin
          key = {coin.title}
          title = {coin.title}
          price = {coin.price}
          changePercent = {coin.changePercent}
          />
      ))}
    </section>
  );
};

export default Trade;