const jfile = require('jsonfile');
let usersPath = __dirname + '/Users.json';
let movisePath = __dirname + '/NewMovies.json';

const getUsers = function () {
    return new Promise((resolve, reject) => {
        jfile.readFile(usersPath, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })

}

const getMovise = function () {
    return new Promise((resolve, reject) => {
        jfile.readFile(movisePath, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })

}
const writeToJson = function (path, obj) {

    return new Promise((resolve, reject) => {
        jfile.writeFile(path, obj, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve('Succeeded')
            }
        })

    })
}
module.exports = { getUsers, getMovise, writeToJson }