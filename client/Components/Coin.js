import React from 'react';
import '../css/Coin.scss';
import { Link } from 'react-router-dom';
const Coin = ({ title, price, changePercent }) => {
  // capitalize the first letter of the string
  title = title.charAt(0).toUpperCase() + title.slice(1);
  // make the % change two decimals long
  const changePercentNum = parseFloat(changePercent).toFixed(2);
  // if the percent is less than 0 make it red, otherwise green
  const percentColor = () => {
    return {
      color: parseFloat(changePercent).toFixed(2) < 0 ? 'red' : 'green',
    };
  };
  return (
    <Link to={`/trade/${title}`}>
      <div className='Coin'>
        <h3>{title}</h3>
        <p>{'$' + price}</p>
        <p id='percentChange' style={percentColor()}>
          {changePercentNum + '%'}
        </p>
      </div>
    </Link>
  );
};

export default Coin;
