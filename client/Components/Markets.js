import React, { useContext } from 'react';
import { bryBitReducer } from '../context/context';
import '../css/Markets.scss';
import Coin from './Coin';
const Markets = () => {
  const {state} = useContext(bryBitReducer);

  return (
    <section id="Markets">
      <div className = "Markets__container">
        <h2 id = "Markets__header">
          Explore crypto like Bitcoin,
          Ethereum, Dogecoin,
          and more...
        </h2>
        </div>
      <div className= "Markets__container">
        {state.isFetching ? (<img src='./images/B.gif' alt='brybit logo'></img>) 
        : state.marketList.map((coin,i) => (
          <Coin
          key = {coin.title}
          title = {coin.title}
          price = {coin.price}
          changePercent = {coin.changePercent}
          />
        ))}
      </div>
    </section>
  );
};

export default Markets;