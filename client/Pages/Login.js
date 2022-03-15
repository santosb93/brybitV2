import React from 'react';
import '../css/Login.scss'
import {Link} from 'react-router-dom'
const Login = () => {
  return (
    <section id="login_form">
    <form>
      <h1>Login</h1>
      <div className = "container">
        <label htmlFor= "Login__username">Username:</label>
        <input type = "text" id = "Login__username" placeholder="Enter username"></input>
      </div>
      <div className = "container">
        <label htmlFor= "Login__password">Password:</label>
        <input type = "password" id = "Login__password" placeholder="Enter password.."></input>
      </div>
      </form>
      <button id="login_button">Login</button>
      <a href = "/signup"><button>Create an Account</button></a>
    </section>
  );
};

export default Login;