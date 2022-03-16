const express = require ('express');
router = express.Router();
const usersController = require('../controllers/usersContoller');



router.get('/', usersController.getAllUsers, (req,res) => {
  res.status(200).json({users: res.locals.users})
});

module.exports = router;