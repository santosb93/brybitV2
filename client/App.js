import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import React, { useReducer, useEffect} from 'react';
import NavBar from './Components/NavBar';
import Login from './Pages/Login';
import Home from './Pages/Home';
import ErrorPage from './Pages/ErrorPage';
import Ranks from './Pages/Ranks'
import MyProfile from './Pages/MyProfile';
import SignUp from './Pages/SignUp';
import TradeCoin from './Pages/TradeCoin';
import Trade from './Pages/Trade';
import {bryBitReducer} from './context/context.js'
import reducer from './Reducers/reducer.js'
import * as types from './constants/actionTypes'
const marketsListUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cpolkadot%2Clitecoin%2Ccardano%2Csushi&vs_currencies=usd&include_24hr_change=true';

function App() {
  
  const [state,dispatch] = useReducer(reducer, {
    isFetching: true,
    marketList: [],
    liveCandle: {}
  });
  // on page load, get the marketsList, update state
  useEffect(() => {
    // set is fetching to true
    dispatch({type: types.IS_FETCHING, payload: true});
    // fetch the marketList data
    fetch(marketsListUrl)
    .then((res) => res.json())
    .then((data) => {
      // set is fetching to false
      dispatch({type: types.IS_FETCHING, payload: false});
      // get the data and convert to array, sorted by price
      const marketsArray = Object.entries(data).sort((a,b) => b[1].usd - a[1].usd);
      // map the marketsArray into an array of objects
      const MarketListArray = marketsArray.map( (el) => ({
        title: el[0],
        price: el[1].usd,
        changePercent: el[1].usd_24h_change
      }));
      // update the MarketListArray
      dispatch({type: types.UPDATE_MARKET_LIST, payload: MarketListArray})
    })
    .catch((err)=> console.log('Markets: fetch /api: Error: ', err));
  }, []);
    // utilize use effect hook to fetch from gecko api for market data 
    return (
      <Router>
        <div className = "brybit">
        <bryBitReducer.Provider value = {{state, dispatch, marketsListUrl}}>
          <NavBar/>
            <Routes>
              <Route path = '/' element={<Home/>}/>
              <Route path = '/login' element={<Login/>}/>
              <Route path = '/ranks' element={<Ranks/>}/>
              <Route path = '/myProfile' element={<MyProfile/>}/>
              <Route path = '/signup' element = {<SignUp/>}/>
              <Route path = '/trade' element = {<Trade/>}/>
              <Route path = '/trade/:id' element = {<TradeCoin/>}/>
              <Route path = "*" element={<ErrorPage/>}/>
            </Routes>
            </bryBitReducer.Provider>
          </div>
      </Router>); 
}

export default App;
