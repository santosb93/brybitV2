const db = require('../models/bryBitModels.js');
const usersController = {};

usersController.getAllUsers = async (req, res, next) => {
  console.log('reqbody:', req.body);
  try {
    const queryString = `SELECT u.username, u.brybits, u.first_name, u.last_name FROM users u ORDER BY brybits DESC`;
    const dbRes = await db.query(queryString);
    res.locals.users = dbRes.rows;
    // console.log(dbRes.rows);
    next();
  } catch (error) {
    return next({
      log: 'error in userController.getAllUsers',
      message: {err: err}
    })
  } 
}

usersController.getUser = async (req, res, next) => {
  try {
    const query = {
      text: 'SELECT u.username,u.email,u.brybits,u.first_name,u.last_name from users u WHERE u.username = $1 AND u.password = $2',
      values: [req.body.username, req.body.password]
    };
    // query the database with the req body info
    const dbRes = await db.query(query);
    // if dbRes.rows[0] is empty, wrong username and password
    // store the user in locals.user
    console.log(dbRes.rows[0]);
    res.locals.user = dbRes.rows[0]
    return next();
  }catch (err) {
    return next({
      log: 'error in userController.getUser',
      message: {err: err}
    });
  } 
}
usersController.updateUser = async (req, res, next) => {
  const {username, brybits} = req.body
  try {
    const query = {
      text: 'UPDATE users SET brybits = $2 WHERE users.username = $1;',
      values: [username, brybits]
    };
    // query the database with the req body info
    await db.query(query);
    // if dbRes.rows[0] is empty, wrong username and password
    // store the user in locals.user
    res.locals.message = 'success';
    return next();
  }catch (err) {
    return next({
      log: 'error in userController.updateUser',
      message: {err: err}
    });
  } 
}


module.exports = usersController;