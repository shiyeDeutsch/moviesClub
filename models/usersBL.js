let jsonDAL = require('../DAL/jsonDAL')
const date = require('date-and-time');


exports.getUsersMaster = async function () {
    let users = await jsonDAL.getUsers()
    let masterDiteils = users.map(x => ({ id: x.id, userName: x.userName }))
    return masterDiteils;
}

exports.deleteUser = async function (id) {
    let users = await jsonDAL.getUsers()

    // Get indexOf id

    let index = users.map(x => x.id).indexOf(id);

    // delete the item

    users.splice(index)

    // write the changes to json

    let path = ('./DAL/Users.json')
    let status = await jsonDAL.writeToJson(path, users)

    return status;
}
// this.deleteUser(2)
exports.getUser = async function (id) {
    let users = await jsonDAL.getUsers()
    let user = users.find(x => x.id == id)
    return user;
}
exports.updateUser = async function (obj) {

    let users = await jsonDAL.getUsers()

    let id = Number(obj.id);

    let index = users.map(x => x.id).indexOf(id);

    let user = users[index];
    console.log(user)
    user.fname = obj.fname;
    user.lname = obj.lname;
    user.userName = obj.username;
    user.pwd = obj.pwd;
    users[index] = user;
    let path = ('./DAL/Users.json')

    let status = await jsonDAL.writeToJson(path, users)

    return status;
}
exports.addNewUser = async function (obj) {
    let users = await jsonDAL.getUsers();
    let lestid = users[users.length - 1].id;



    const now = new Date();
   // date.format(now, 'DD/MM/YYYY'); 
    console.log(now)
    let newUser = {
        id: lestid + 1,
        fname: obj.fname,
        lname: obj.fname,
        userName: obj.username,
        pwd: obj.pwd,
        createdDate: now,
        maxDailyActions: 2,
        dailyActions: 1,
        admin: false
    }
    let temp=users.concat(newUser)
    let path = ('./DAL/Users.json')

   await jsonDAL.writeToJson(path,temp)
}