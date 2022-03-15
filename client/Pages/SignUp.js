import React from 'react';
import '../css/Signup.scss'
const SignUp = () => {
  return (
    <section id="signup_form">
    <form>
      <h1>Sign Up</h1>
      <div className = "container">
        <label htmlFor= "signUp__username">Username:</label>
        <input type = "text" id = "Login__username" placeholder="Enter username"></input>
      </div>
      <div className = "container">
        <label htmlFor= "Login__firstname">First Name:</label>
        <input type = "password" id = "Login__firstname" placeholder="First Name"></input>
        <label htmlFor= "Login__password">Last Name:</label>
        <input type = "password" id = "Login__confirm_password" placeholder="Last Name"></input>
      </div>
      <div className = "container">
        <label htmlFor= "Login__password">Password:</label>
        <input type = "password" id = "Login__password" placeholder="Enter password.."></input>
        <label htmlFor= "Login__password">Password:</label>
        <input type = "password" id = "Login__confirm_password" placeholder="Confirm password.."></input>
      </div>
      <div className = "container">
        <label htmlFor= "signUp__email">Email:</label>
        <input type = "text" id = "Login__email" placeholder="Enter email"></input>
        <label htmlFor= "signUp__email">Email:</label>
        <input type = "text" id = "Login__confirm_email" placeholder="Confirm email"></input>
      </div>
      </form>
      <button id = 'signup_button'>Signup</button>
     <a href = "/login"><button id="login_button">Go to Login</button></a>

    </section>
  );
};

export default SignUp;