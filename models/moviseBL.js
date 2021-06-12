
const jsonDAl = require('../DAL/jsonDAL');
const restDAl = require('../DAL/restDAL');

exports.writeNewMovie = async function (obj) {
    //Get  req date
    let name = obj.name
    let language = obj.language
    let genres;
    if (typeof obj.genres === 'object') {
        genres = obj.genres
    }
    else {
        genres = [obj.genres]
    }

    //Get lats movie Id
    let allMovies = 0;
    let lestId = 0;

    allMovies = await jsonDAl.getMovise();
    // console.log(allMovies)
    lestId = allMovies[allMovies.length - 1].id

    console.log(lestId)
    // Create new movie Obj

    let newMovie =
    {
        id: lestId + 1,
        name: name,
        language: language,
        genres: genres,
        image: { medium: "" }


    }

    // Push into json
    let path = ('./DAL/NewMovies.json')

    let temp = allMovies.concat(newMovie);
    console.log(temp)
    let status = await jsonDAl.writeToJson(path, temp);


}
//this.writeNewMovie({ name: "name", language: "xxxxx", genres: "xxx" }).then(x => console.log(x))
exports.searchMovies = async function (obj) {
    let name = obj.name;
    let language = obj.language;
    let genres;
    if (typeof obj.genres === 'object') {
        genres = obj.genres;
    }
    else {
        genres = [obj.genres];
    }
    let resp = await restDAl.getMovise();
    let restMovies = resp.data;
    let jsonMovies = await jsonDAl.getMovise();
    let allMovies = restMovies.concat(jsonMovies);

    var temp = allMovies.filter((x) => {
        return (
            (x.name == name || name == '') &&
            (genres.some(v => x.genres.includes(v)) || genres == '') &&
            (x.language == language || language == '')
        )
    });


    let selctedMovise = temp.map(x => ({ id: x.id, name: x.name, genres: x.genres, language: x.language, image: x.image.medium }))
    let moviseWithSameGenra;
   
    console.log ( name)
    if ( name != '') 
    {
        let genreslist = new Set();

        selctedMovise.forEach(x => {
            x.genres.forEach(y => {
                genreslist.add(y)
            })
        });
      
        let xx = [];
        genreslist.forEach(y => {
            xx.push(y)
        })
        moviseWithSameGenra = allMovies.filter((x) => {

            return (xx.some(v => x.genres.includes(v)))
        });

    }

    return { selctedMovise: selctedMovise, moviseWithSameGenra: moviseWithSameGenra };
}


exports.getGenreslist = async function () {
    let resp = await restDAl.getMovise();
    let restMovies = resp.data;
    let jsonMovies = await jsonDAl.getMovise();
    let allMovies = restMovies.concat(jsonMovies);

    let genreslist = new Set();
    allMovies.forEach(x => {
        x.genres.forEach(y => {
            genreslist.add(y)
        })
    });
    return genreslist;
}
exports.getMovie = async function (id) {

    let resp = await restDAl.getMovise();
    let restMovies = resp.data;
    let jsonMovies = await jsonDAl.getMovise();
    let allMovies = restMovies.concat(jsonMovies);
    let movie = allMovies.find(x => x.id == id);
    return movie;
}
