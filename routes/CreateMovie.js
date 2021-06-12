var express = require('express');
const session = require('express-session');
var router = express.Router();
let loginBL = require('../models/loginBL')
let moviesBL = require('../models/moviseBL')

/* GET home page. */
router.get('/', function (req, res, next) {
    if (session.valid) {
        res.render('CreateMovie', {status:''});
    }
    else {
        res.redirect('login')
    }
});

router.post('/',async (req, res, next) => {
    try{
        let status=   await  moviesBL.writeNewMovie(req.body)
        console.log('ok')
        console.log(status)
        res.redirect('/menu')
 }
  catch(err){
    console.log('this is an Err')
    console.log(err)

      res.render('CreateMovie',{status:err})
  }

})
module.exports = router;
