const express = require('express');
router = express.Router();
const usersController = require('../controllers/usersContoller');

router.get('/', usersController.getAllUsers, (req, res) => {
  res.status(200).json({ users: res.locals.users });
});

router.post('/login', usersController.login, (req, res) => {
  res.status(200).json({ user: res.locals.user });
});

router.patch('/updateUser', usersController.updateUser, (req, res) => {
  res.status(200).json({ message: res.locals.message });
});

router.post('/createUser', usersController.createUser, (req, res) => {
  console.log('success');
  res.status(200).json({ username: res.locals.username });
});
module.exports = router;
