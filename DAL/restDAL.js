let axios = require('axios');
const URL ='https://api.tvmaze.com/shows';

const getMovise = function () {

    return axios.get(URL);
}

const getMovie = function (id) {
    return axios.get(URL +'/'+ id);
}


module.exports = { getMovie, getMovise }