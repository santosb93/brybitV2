import React from 'react';
import '../css/ErrorPage.scss';
import bLogo from '../../images/B.gif';
function ErrorPage(props) {
  return (
    <section id='error'>
      <h1>Sorry, this page doesn't exist.</h1>
      <img src={bLogo} alt='brybit logo'></img>
    </section>
  );
}

export default ErrorPage;
