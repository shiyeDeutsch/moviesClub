var express = require('express');
// const session = require('express-session');
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
            req.session.admin = true;
        }
        else {
            req.session.dailyActions = valid.dailyActions
        }
        req.session.valid = true;
        req.session.userId = valid.id;
        req.session.username = valid.username;
        res.redirect('/menu');
    }
    else {
        res.render('login', { msg: 'name or passowrd are not invalid ! ' })
    }
});

module.exports = router;


