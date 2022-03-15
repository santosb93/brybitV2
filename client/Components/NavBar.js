import React from 'react';
import '../css/NavBar.scss';
import logo_transparent from '../../images/logo_transparent.png'
const NavBar = props => {
  return (
    <nav>
      <a href='/'>
        <img src={logo_transparent} alt="BryBit Logo"></img>
        <h1>BryBit</h1>
      </a>
      <ul>
        <li>
          <input placeholder = "Search"></input>
        </li>
        <li>
          <a href="/trade">Trade</a>
        </li>
        <li>
          <a href="/ranks">Ranks</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/signup" id ='signup'>Sign up</a>
        </li>
        <li>
          <a href="/myProfile">Profile</a>
        </li>
      </ul>
    </nav>
  );
};


export default NavBar;