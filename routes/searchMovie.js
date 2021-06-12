var express = require('express');
var moviesBL = require('../models/moviseBL');
const session = require('express-session');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  if (session.valid) {
    let genreslist = await moviesBL.getGenreslist();
    // console.log(genreslist)
    res.render('searchMovie', { genreslist })

  }
  else {
    res.redirect('login')
  }
});

router.post('/results', async function (req, res, next) {  
    if (session.valid)
     {
      if (!session.admin)
      {
         session.dailyActions++;
      if (session.dailyActions > session.maxDailyActions)
       {
        session.valid = false;
      }
      }
     

      console.log(req.body.genres)
      let results = await moviesBL.searchMovies(req.body)
      res.render('results', { results })
    }
    else {
      res.redirect('login')
    }
});

router.get('/moviedata/:id', async function (req, res, next) {
  if (session.valid) {
    let data = await moviesBL.getMovie(req.params.id)
    res.render('moviedata', { data })
  }
  else {
    res.redirect('login')
  }
});

module.exports = router;
