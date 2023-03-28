const express = require('express');
const userController = require('../controllers/userController');
const user = require('../models/user');

const userRoutes = express.Router();
userRoutes.get('/', userController.homePage);
userRoutes.get('/users', userController.home);
userRoutes.get('/users/signin', userController.signin );
userRoutes.post('/users/signin', userController.loggingUser);
userRoutes.get('/users/signup', userController.signup);
userRoutes.post('/users/signup', userController.registerUser);


module.exports = userRoutes;