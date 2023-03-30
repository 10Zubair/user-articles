const express = require('express');
const articleRoutes = express.Router();
const methodOverride = require('method-override');
const sessionCheckingMiddleware = require('../middleware/sessionManager');
const articleContoller = require('../controllers/articleController');

articleRoutes.use(methodOverride('_method'));

articleRoutes.get('/users/articles', sessionCheckingMiddleware, articleContoller.index);
articleRoutes.get('/users/articles/new', sessionCheckingMiddleware, articleContoller.newArticle);
articleRoutes.post('/users/articles/create', sessionCheckingMiddleware, articleContoller.createArticle);
articleRoutes.get('/users/articles/:id', sessionCheckingMiddleware, articleContoller.show);
articleRoutes.get('/users/articles/:id/edit', sessionCheckingMiddleware, articleContoller.edit);
articleRoutes.post('/users/articles/:id', sessionCheckingMiddleware, articleContoller.update);
articleRoutes.get('/users/articles/delete/:id', sessionCheckingMiddleware, articleContoller.deleteArticle);

module.exports = articleRoutes;