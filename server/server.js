const express = require('express');
const app = express();
const path = require('path');
const krakenController = require('./controllers/krakenController');



/**
 * handle parsing request body
 */
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

//  app.get('/', (req, res) => {
//    return res.status(200).send("hi");
//  });

app.use('/', express.static(path.resolve(__dirname, '../build/')));
// serve index.html on the route '/'
app.get('/' , (req, res) => {
  console.log(err);
  return res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
});
/**
 * 
 */
 app.get('/coins/ohlc/:coin', krakenController.getOhlcData, (req, res) => {
   return res.status(200).json({ohlc: res.locals.ohlcData});
 });


app.use((req,res)=>{
  res.status(400).send("BAD ROUTE");
})

 /**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(3000, ()=> {
  console.log('listening on port 3000')
}); //listens on port 3000 -> http://localhost:3000/

