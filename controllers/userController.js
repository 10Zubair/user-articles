const userModel = require('../models/user');
const bcrypt = require('bcrypt');
var session = require('express-session');

const homePage = (req, res) => {
  res.redirect('/users');
}

const home = (req, res) => {
  res.render('user/home')
}

const signup = async(req, res) => {
  res.render('user/signup');
}

const registerUser = async (req, res) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    console.log(hashPassword)
    const newuser = new userModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashPassword
    });
    await newuser.save();
    res.redirect('/users/signin');
  } catch (error) {
    console.log(error);
    res.render('user/signup', { error: "Failed to register"})
  }
}

const signin = async(req, res) => {
  res.render('user/signin');
}

const loggingUser = async (req, res) => {
  try {
    const findUser = await userModel.findOne({ email: req.body.email })
    if(findUser) {
      var passwordChk = await bcrypt.compare(req.body.password, findUser.password)
      if(passwordChk) {
        session = req.session;
        session.email = findUser.email;
        session.userId = findUser._id
        res.redirect('/users/userdashboard');
      }
      else {
        res.send('Incorrect password')
      }
    }
    else {
      res.send("You are not registered please sign up first")
    }
  } catch (error) {
    console.log(error);
  }
}

const userdashboard = (req, res) => {
  if (req.session.email) {
    res.render('user/userdashboard');
  }
  else {
    res.redirect('/users/signin');
  }
}

const logout = (req, res) => {
  req.session.destroy((error) => {
    if(error) {
      console.log(error);
    }
    else {
      res.redirect('/users')
    }
  })
}

module.exports = {
  homePage,
  home,
  signup,
  registerUser,
  signin,
  loggingUser,
  userdashboard,
  logout
}