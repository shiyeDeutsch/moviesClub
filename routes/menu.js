var express = require('express');
// const session = require('express-session');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.valid) {
    res.render('menu', { data: { admin: req.session.admin, username: req.session.username } });
  }
  else {
    res.redirect('login')
  }
});

module.exports = router;
