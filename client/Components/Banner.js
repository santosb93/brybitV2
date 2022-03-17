import React, { useEffect, useState } from 'react';
import '../css/Banner.scss';
import TopUser from './TopUser';
import bGif from '../../images/B.gif'

const Banner = () => {
  const [top10, setTop10] = useState(null);


  //on page load, get all users
  useEffect(() => {
    fetch('/users')
    .then(res => res.json())
    .then(data => {
      const top10Array = [];
      for (let i = 0; i < 10; i++){
        top10Array.push(<TopUser 
          key = {data.users[i].username}
          rank = {i + 1}
          username = {data.users[i].username}
          firstName = {data.users[i].first_name}
          lastName =  {data.users[i].last_name}
          bryBits = {data.users[i].brybits}
        />);
      }
      setTop10(top10Array);
    })
  },[]);
  return (
    <section id = "Banner">
      <div className = "card">
        <h2>Top 10 Traders</h2>
        <div className = 'top10container'>
          <div className= 'top10Headers'>
            <h3 className = 'rank'>Rank</h3>
            <h3 className = 'username'>Username</h3>
            <h3 className = 'name'>Name</h3>
            <h3>BryBits</h3>
          </div>
          {(top10) ? top10 : <img src={bGif} alt='brybit logo'></img>}
        </div>
      </div>
    </section>
  );
};

export default Banner;  