const sessionCheckingMiddleware = (req, res, next) => {
  if (req.session.email) {
    next(); // move on to the next function in the middleware chain
  } else {
    res.redirect('/users/signin');
  }
};

module.exports = sessionCheckingMiddleware;