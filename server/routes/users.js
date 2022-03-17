const express = require ('express');
const { resolvePath } = require('react-router');
router = express.Router();
const usersController = require('../controllers/usersContoller');



router.get('/', usersController.getAllUsers, (req,res) => {
  res.status(200).json({users: res.locals.users})
});

router.post('/login', usersController.getUser, (req,res) => {
  res.status(200).json({user: res.locals.user})
});

router.patch('/updateUser', usersController.updateUser, (req,res) => {
  res.status(200).json({message: res.locals.message});
})
module.exports = router;