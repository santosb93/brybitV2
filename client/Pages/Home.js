import React from 'react';
import Hero from '../Components/Hero';
import Banner from '../Components/Banner';
import Markets from '../Components/Markets';
function Home() {
  // utilize use effect hook to fetch from gecko api for market data  
  return (
    <div className = "home_page">
    <Hero/>
    <Banner/>
    <Markets/>
      <div>Footer</div>
    </div>
  );
}

export default Home;