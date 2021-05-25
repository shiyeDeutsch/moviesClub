let express = require('express')
var router = express.Router();

router.get('/',(req, res, next) => {
    res.render('prodact', { data: 'prodact page' })
})

module.exports = router;
