import React, { useEffect } from 'react';
import '../css/Message.scss'
const Message = (props) => {
  const {message, color} = props;
  useEffect(()=>{
    const p = document.getElementById('message');
    p.innerText = message;
  })
  return (
    <div>
      <p id ="message" style = {{color}}></p>
    </div>
  );
};

export default Message;