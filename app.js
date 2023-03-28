const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
const dbURI = 'mongodb://localhost/ArticlesDB';
mongoose.connect(dbURI)
  .then((result) => {
    app.listen(3000);
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  })

app.set('view engine', 'ejs');//automatically will look for the view directory
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);

app.use((req, res) => {
  res.send("Page not found!");
});