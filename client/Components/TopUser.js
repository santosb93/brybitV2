import React from 'react';
import '../css/TopUser.scss'

const TopUser = (props) => {
  const {rank,username, firstName, lastName, bryBits} = props;
  return (
    <div className = 'user'>
      <h4 className = 'rank'> {rank + '.'}</h4>
      <h4 className = 'username'>{username}</h4>
      <h4 className = 'name'>{firstName + ' '+lastName}</h4>
      <h4>{bryBits}</h4>
    </div>
  );
};

export default TopUser;