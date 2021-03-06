import React, { useContext, useEffect, useRef } from 'react';
import { bryBitReducer } from '../context/context';
import { useNavigate } from 'react-router-dom';
import '../css/Login.scss';
import Message from '../Components/Message';
import * as types from '../constants/actionTypes';
const Login = () => {
  let displayMessage = useRef('');
  let textColor = {};
  // get the dispatch from the context
  const { dispatch } = useContext(bryBitReducer);
  const login = () => {
    const username = document.getElementById('Login__username');
    const password = document.getElementById('Login__password');
    if (username.value && password.value) {
      const data = {
        username: username.value,
        password: password.value,
      };
      // fetch the database with the login information
      fetch('/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            displayMessage.current = `Login successful.`;
            // change the state of activeUser
            dispatch({ type: types.SET_CURRENT_USER, payload: data.user });
            username.value = '';
            password.value = '';
            textColor = 'green';
          } else {
            displayMessage.current =
              'Incorrect password/login. Please try again';
            dispatch({ type: types.SET_CURRENT_USER, payload: {} });
            textColor = 'red';
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <section id='login_form'>
      <form>
        <h1>Login</h1>
        <div className='container'>
          <label htmlFor='Login__username'>Username:</label>
          <input
            type='text'
            id='Login__username'
            placeholder='Enter username'
          ></input>
        </div>
        <div className='container'>
          <label htmlFor='Login__password'>Password:</label>
          <input
            type='password'
            id='Login__password'
            placeholder='Enter password..'
          ></input>
        </div>
        {<Message color={textColor} message={displayMessage.current} />}
      </form>
      <button id='login_button' onClick={login}>
        Login
      </button>
      <a href='/signup'>
        <button>Create an Account</button>
      </a>
    </section>
  );
};

export default Login;
