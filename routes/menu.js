var express = require('express');
const session = require('express-session');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  if(session.valid){
     res.render('menu', { data: { admin: session.admin,username:session.username } });
  }
 else{
   res.redirect('login')
 }
});

module.exports = router;
