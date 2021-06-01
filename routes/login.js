var express = require('express');
var router = express.Router();
let userBL = require('../models/usersBL')
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', { title: 'Express' });
});
router.post('/',async (req, res, next) => {
    console.log (req.body)
   if (userBL.checkIfUserExist(req.body)) {
    
        let data = await userBL.getusersMaster()
        console.log(data)
        res.render('users', { usersData: data })
    }
    else{
            res.send('not found')
    }
    
})
module.exports = router;
