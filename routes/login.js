var express = require('express');
const session = require('express-session');
var router = express.Router();
let loginBL = require('../models/loginBL')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', { msg: '' });
});
router.post('/loginReq', async function (req, res, next) {

    let valid = await loginBL.isUserValid(req.body.username, req.body.pwd);
    // console.log(valid)
    if (valid.valid) {
        if (valid.admin) {
            session.admin = true;
        }
        else {
            session.dailyActions = valid.dailyActions
        }
        session.valid = true;
        session.userId = valid.id;
        session.username = valid.username;
        res.redirect('/menu');
    }
    else {
        res.render('login', { msg: 'name or passowrd are not invalid ! ' })
    }
});

module.exports = router;


