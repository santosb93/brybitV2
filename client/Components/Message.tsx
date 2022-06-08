import { string } from 'prop-types';
import React, { useEffect } from 'react';
import '../css/Message.scss';

type MessageTypes = {
  message: string;
  color: 'red' | 'green';
};
const Message = ({ message, color }: MessageTypes) => {
  useEffect(() => {
    const p = document.getElementById('message');
    p.innerText = message;
  });
  return (
    <div>
      <p id='message' style={{ color }}></p>
    </div>
  );
};

export default Message;
