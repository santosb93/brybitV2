import React from 'react';
import '../css/Hero.scss';
import coinsVideo from '../../images/coins.mp4'

const Hero = () => {
  return (
    <div id ="hero_container">
      <section id = "hero">
        <video loop autoPlay muted>
          <source src ={coinsVideo} type="video/mp4"></source>
        </video>
        <header>
          <h1><span>The #1 FREE practice trading website</span></h1>
          <h2><span>Trade for fun. Trade to practice. Trade to compete.</span></h2>
          <span>
            <input placeholder ="Enter Email"></input>
            <a href='/signup'><button>Sign Up</button></a>
          </span>
        </header>
      </section>
  </div>
  );
};

export default Hero;