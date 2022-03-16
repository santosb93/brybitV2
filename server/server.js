const express = require('express');
const app = express();
const path = require('path');




/**
 * require routers
 */
const coinRouter = require('./routes/coins.js');
const usersRouter = require('./routes/users');

/**
 * handle parsing request body
 */
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));


/**
 * send static files to all requests with path '/' 
 */
app.use('/', express.static(path.resolve(__dirname, '../build/')));

/**
 * send index.html to all requests with path '/' 
 */
app.get('/' , (req, res) => {
  console.log(err);
  return res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
});

/**
 * Routers
 * 
 */

/**
 * send all requests to path /coins to coinRouter
 */
app.use('/coins/', coinRouter);
/**
 * send all requests to path /coins to coinRouter
 */
 app.use('/users/', usersRouter);


 /**
 * endRouters
 * 
 */

 
/**
 * Global catch 
 */
app.use((req, res)=>{
  res.status(400).send("BAD ROUTE");
})

 /**
 * express error handler
 * 
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

