const express = require('express');
const articleRoutes = express.Router();
var session = require('express-session');
const articleContoller = require('../controllers/articleController');

articleRoutes.get('/users/articles', articleContoller.index);
articleRoutes.get('/users/articles/new', articleContoller.newArticle);
articleRoutes.post('/users/articles/create', articleContoller.createArticle);
articleRoutes.get('/users/articles/:id', articleContoller.show);
articleRoutes.get('/users/articles/:id/edit', articleContoller.edit);
articleRoutes.post('/users/articles/:id', articleContoller.update);
articleRoutes.get('/users/articles/delete/:id', articleContoller.deleteArticle);

module.exports = articleRoutes;