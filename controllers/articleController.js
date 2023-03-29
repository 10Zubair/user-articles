const articleModel = require('../models/article');

const index = async (req, res) => {
  try {
    if (req.session.email) {
      const articles = await articleModel.find().populate('author');
      res.render('article/articles', {articles: articles});
    }
    else {
      res.redirect('/users/signin')
    }
  } catch (error) {
    console.log(error)
  }
}

const newArticle = (req, res) => {
  if (req.session.email) {
    res.render('article/newArticle');
  } else {
    res.redirect('/users/signin')
  }
}

const createArticle = async(req, res) => {
  try {
    const articleObj = new articleModel({
      articlename: req.body.articlename,
      description: req.body.description,
      author: req.body.author,
    })
    await articleObj.save();
  } catch (error) {
    console.log(error);
  }
}

const show = async(req, res) =>{
  try {
    await articleModel.findById(req.params.id).populate('author')
      .then((result) => {
        res.render('article/show', { article: result });
      })
      .catch((error) => {
        console.log(error);
      })
  } catch (error) {
    console.log(error);
  }
}

const edit = async(req, res) => {
  try {
    if (req.session.email) {
      const obj =  await articleModel.findById(req.params.id);
      res.render('article/edit', { article: obj});      
    } else {
      res.redirect('/users/signin');
    }
  } catch (error) {
    console.log(error);
  }
}

const update = async(req, res) => {
  try {
    const article = await articleModel.findById(req.params.id);
    article.articlename = req.body.articlename;
    article.description = req.body.description;
    await article.save();
    res.redirect('/users/articles');
  } catch (error) {
    console.log(error);
  }
}

const deleteArticle = async(req, res) => {
  try {
    await articleModel.findByIdAndDelete(req.params.id);
    res.redirect('/users/articles');
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  index,
  newArticle,
  createArticle,
  show,
  edit,
  update,
  deleteArticle
}