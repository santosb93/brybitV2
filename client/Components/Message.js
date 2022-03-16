import React, { useEffect } from 'react';
import '../css/Message.scss'
const Message = (props) => {
  const {message} = props;
  useEffect(()=>{
    const p = document.getElementById('message');
    p.innerText = message.current;
  })
  return (
    <div>
      <p id ="message"></p>
    </div>
  );
};

export default Message;