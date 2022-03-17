import React, { useContext, useEffect, useRef } from 'react';
import '../css/NavBar.scss';
import {Link} from "react-router-dom";
import logo_transparent from '../../images/logo_transparent.png'
import { bryBitReducer } from '../context/context';
const NavBar = props => {
   const {state} = useContext(bryBitReducer);
   return (
    <nav> 
      <Link to = '/'>
        <img src={logo_transparent} alt="BryBit Logo"></img>
        <h1>BryBit</h1>
      </Link>
      <ul>
        <li>
          <input placeholder = "Search"></input>
        </li>
        <li>
          <Link to="/trade">Trade</Link>
        </li>
        <li>
          <Link to="/ranks">Ranks</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup" id ='signup'>Sign up</Link>
        </li>
        <li>
          <Link to="/myProfile" id= 'profile'>{state.currentUser.username}</Link>
        </li>
      </ul>
    </nav>
  );
};


export default NavBar;