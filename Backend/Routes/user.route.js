const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const userController = require('../Controller/user.controller')

router.post('/register', [
  body('email').isEmail().isLength().withMessage('Invalid Email'),
  body('fullname.firstname').isLength({min:3}).withMessage('Firstname must be three character long'),
  body('password').isLength({min:5}).withMessage('Password must be 5 characters long')
], userController.registerUser);

module.exports = router; 