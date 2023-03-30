const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const session = require('express-session');

const app = express();
app.use(session({
  secret: 'thisismykey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 120000,
  }
}));

const dbURI = 'mongodb://localhost/ArticlesDB';
mongoose.connect(dbURI)
  .then((result) => {
    app.listen(3000);
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.set('view engine', 'ejs');//automatically will look for the view directory
app.use(express.json());
//app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes, articleRoutes);

app.use((req, res) => {
  res.send("Page not found!");
});