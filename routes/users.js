var express = require('express');
var userBL = require('../models/usersBL');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Please log in before');
});
router.get('/userdata/:id',async function(req, res, next) {
  let id=req.params.id;
 let data=await userBL.getuserDetails(id)
  res.render('userdata',{userData:data});
});
module.exports = router;
