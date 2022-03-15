/**
 * ************************************
 *
 * @module  BrybitReducer
 * @author
 * @date
 * @description reducer for brybit data
 *
 * ************************************
 */



 import * as types from '../constants/actionTypes';


 const reducer = (state, action) => {
 
   switch(action.type) {
   case types.IS_FETCHING:
     return {
       ...state,
       isFetching: action.payload
     }
   case types.UPDATE_MARKET_LIST:{
     return{
       ...state,
       marketList: action.payload
     }
   }
   case types.UPDATE_OHLC_COIN:{
     return{
       ...state,
       ohlcCoin: action.payload
     }
   }
   case types.UPDATE_LIVE_CANDLE:{
     return{
       ...state,
       liveCandle: action.payload
     }
   }
 
     default: return state;
   }
 
 
 
 };
 
 export default reducer;