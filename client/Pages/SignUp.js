import React, { useContext, useEffect, useRef, useState } from 'react';
import '../css/Signup.scss';
import Message from '../Components/Message';
import { bryBitReducer } from '../context/context';
import * as types from '../constants/actionTypes';

const SignUp = () => {
  const [passwordMessage, setPasswordMessage] = useState([]);
  const [emailMessage, setEmailMessage] = useState([]);
  const [usernameMessage, setUsernameMessage] = useState([]);
  const [nameMessage, setNameMessage] = useState([]);
  const [successMessage, setSuccessMessage] = useState([]);
  const { dispatch } = useContext(bryBitReducer);
  const users = useRef([]);

  useEffect(() => {
    fetch('/users/')
      .then((res) => res.json())
      .then((data) => (users.current = data))
      .catch((err) => console.log('Error getting users in Signup', err));
  }, []);

  const signup = () => {
    console.log(users.current);
    const username = document.getElementById('Signup__username').value;
    const password = document.getElementById('Signup__password').value;
    const passwordConfirm = document.getElementById(
      'Signup__confirm_password'
    ).value;
    const firstName = document.getElementById('Signup__firstname').value;
    const lastName = document.getElementById('Signup__lastname').value;
    const email = document.getElementById('Signup__email').value;
    const emailConfirm = document.getElementById('Signup__confirm_email').value;
    /**
     *
     * Check Usernameentries
     *
     */

    // confirm Usernamelength is truthy
    if (!username) {
      setUsernameMessage([
        <Message color='red' message='Username field is required' />,
      ]);
      return;
    }
    // checkthe Username with the input
    const checkUsername = () => {
      return users.current.users.reduce((acc, el) => {
        if (el.username === username) acc = true;
        return acc;
      }, false);
    };
    // if the username exists in the data base return invalid
    if (checkUsername()) {
      setUsernameMessage([
        <Message color='red' message='Username already exists' />,
      ]);
      return;
    }
    setUsernameMessage([]);
    /**
     *
     * Check First Name and Last Name entries
     *
     */
    if (!firstName || !lastName) {
      setNameMessage([
        <Message color='red' message='First and last Name field is required' />,
      ]);
      return;
    }
    setNameMessage([]);

    /**
     *
     * Check password entries
     *
     */
    // confirm password length is at least 6

    if (!password || !passwordConfirm) {
      setPasswordMessage([
        <Message color='red' message='Password field is required' />,
      ]);
      return;
    }
    if (password.length < 6) {
      setPasswordMessage([
        <Message
          color='red'
          message='Passwords must be at least 6 characters long'
        />,
      ]);
      return;
    }
    // confirm passwords are equal
    if (password !== passwordConfirm) {
      setPasswordMessage([
        <Message color='red' message='Passwords do not match' />,
      ]);
      return;
    }
    setPasswordMessage([]);

    /**
     *
     * Check email entries
     *
     */
    if (!email || !emailConfirm) {
      setEmailMessage([
        <Message color='red' message='Emails field is required' />,
      ]);
      return;
    }
    if (email !== emailConfirm) {
      setEmailMessage([<Message color='red' message='Emails do not match' />]);
      return;
    }
    setEmailMessage([]);
    // creat the user account
    const userAccount = {
      username,
      password,
      email,
      brybits: 10000,
      first_name: firstName,
      last_name: lastName,
    };
    //create the account by creating a post request with the acc info as the body
    fetch('/users/createUser', {
      method: 'POST',
      body: JSON.stringify(userAccount),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('response data after sign in', data);
        // make the currentUser state into the user that logged
        dispatch({ type: types.SET_CURRENT_USER, payload: data.username });
        //setSuccesful Signup message
        setSuccessMessage([
          <Message color='green' message='Signup successful' />,
        ]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section id='signup_form'>
      <form>
        <h1>Sign Up</h1>
        <div className='container'>
          <label htmlFor='Signup__username'>Username:</label>
          <input
            type='text'
            id='Signup__username'
            placeholder='Enter username'
          ></input>
          {usernameMessage}
          {successMessage}
        </div>
        <div className='container'>
          <label htmlFor='Signup__firstname'>Name:</label>
          <input
            type='text'
            id='Signup__firstname'
            placeholder='First Name'
          ></input>
          <input
            type='text'
            id='Signup__lastname'
            placeholder='Last Name'
          ></input>
        </div>
        {nameMessage}
        <div className='container'>
          <label htmlFor='Signup__password'>Password:</label>
          <input
            type='password'
            id='Signup__password'
            placeholder='Enter password..'
          ></input>
          <input
            type='password'
            id='Signup__confirm_password'
            placeholder='Confirm password..'
          ></input>
        </div>
        {passwordMessage}
        <div className='container'>
          <label htmlFor='Signup__email'>Email:</label>
          <input
            type='text'
            id='Signup__email'
            placeholder='Enter email'
          ></input>
          <input
            type='text'
            id='Signup__confirm_email'
            placeholder='Confirm email'
          ></input>
        </div>
        {emailMessage}
      </form>
      <button id='signup_button' onClick={signup}>
        Signup
      </button>
      <a href='/login'>
        <button id='login_button'>Go to Login</button>
      </a>
    </section>
  );
};

export default SignUp;
