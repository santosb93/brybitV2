
 const types = require('../constants/things');
 const pg = require('pg');
 const conString = types.PG_URI;
 const client = new pg.Client(conString);
 client.connect((err) => {
   if (err) return console.log('could not connect to postgres', err);
   console.log('sucessfully connected to postgres');
 })

 //module.exports = client;

module.exports = {
  query: (text, params, callback) => {
    console.log('executed, query:', text);
    return client.query(text, params, callback);
  }
}