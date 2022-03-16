const db = require('../models/bryBitModels.js');
const usersController = {};

usersController.getAllUsers = async (req, res, next) => {
  try {
    const queryString = `SELECT u.username, u.brybits, u.first_name, u.last_name FROM users u ORDER BY brybits DESC`;
    const dbRes = await db.query(queryString);
    res.locals.users = dbRes.rows;
    // console.log(dbRes.rows);
    next();
  } catch (error) {
    return next({
      log: 'error in userController.getAllUsers',
      message: 'eror getting data from database'
    })
  } 
}


module.exports = usersController;