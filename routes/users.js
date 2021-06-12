var express = require('express');
const session = require('express-session');
var router = express.Router();
var usersBL = require('../models/usersBL')

/* GET users  */
router.get('/', async function (req, res, next) {
  if (session.admin) {
    let data = await usersBL.getUsersMaster()
    res.render('usersManagemen', { data })
  }
});
router.get('/dalete/:id', async function (req, res, next) {
  if (session.admin) {
    let status = await usersBL.deleteUser(req.params.id)
    console.log(status)
    let data = await usersBL.getUsersMaster()
    res.render('usersManagemen', { data })
  }
});
router.get('/update/:id', async function (req, res, next) {
  if (session.admin) {
    let user = await usersBL.getUser(req.params.id)
    //  console.log(user)
    res.render('userdata', { user })
  }
});
router.get('/add', async function (req, res, next) {
  if (session.admin) {

    res.render('userdata', { user: '' })
  }
});
router.post('/userdata', async function (req, res, next) {
  if (session.admin) {
  
    if (req.body.id != '')
     {
      await usersBL.updateUser(req.body)

       res.redirect('/users')
     }
    else
     {
      await usersBL.addNewUser(req.body)
      res.redirect('/users')
            
     }


  }
});
module.exports = router;
