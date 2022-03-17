import React, { useState,useEffect } from 'react';
import TopUser from '../Components/TopUser';
import '../css/Ranks.scss';
const Ranks = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('/users/').then(res => res.json())
    .then(data => {
      const usersArray = data.users.map((el,i) => {
       return <TopUser 
          key = {el.username}
          rank = {i + 1}
          username = {el.username}
          firstName = {el.first_name}
          lastName =  {el.last_name}
          bryBits = {el.brybits}
        />;
      })
      console.log(usersArray);
      setUsers(usersArray);
    })
    .catch( err => console.log(err));

  },[])
  return (
    <section id = 'allUsers'>
      <h2>All Users</h2>
        <div className = 'usersContainer'>
          <div className= 'usersHeaders'>
            <h3 className = 'rank'>Rank</h3>
            <h3 className = 'username'>Username</h3>
            <h3 className = 'name'>Name</h3>
            <h3>BryBits</h3>
          </div>
          {users}
        </div>
    </section>
  );
};

export default Ranks;