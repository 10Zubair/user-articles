const userModel = require('../models/user');

const homePage = (req, res) => {
  res.redirect('/users');
}

const home = (req, res) => {
  res.render('home')
}

const signup = async(req, res) => {
  res.render('signup');
}

const registerUser = async (req, res) => {
  try {
    const newuser = new userModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password
    });
    await newuser.save();
    res.redirect('/users/signin');
  } catch (error) {
    console.log(error);
    res.render('signup', { error: "Failed to register"})
  }
}

const signin = async(req, res) => {
  res.render('signin');
}

const loggingUser = async (req, res) => {
  try {
    const findUser = await userModel.findOne({ email: req.body.email })
    if(findUser) {
      if (findUser && findUser.password === req.body.password) {
        res.render('userdashboard');
      }
      else {
        res.send('Invalid email or password')
      }
    }
    else {
      res.send("You are not registered please sign up first")
    }
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  homePage,
  home,
  signup,
  registerUser,
  signin,
  loggingUser
}