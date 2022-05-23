import React, { useEffect } from 'react';
import Hero from '../Components/Hero';
import Banner from '../Components/Banner';
import Markets from '../Components/Markets';
import Footer from '../Components/Footer';
function Home() {
  return (
    <div className='home_page'>
      <Hero />
      <Banner />
      <Markets />
      <Footer />
    </div>
  );
}

export default Home;
