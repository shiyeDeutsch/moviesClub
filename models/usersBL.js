let usersDAl = require('../DAL/usersREST_DAL')


exports.checkIfUserExist = (userDe) => {
    let username = userDe.username;
    let pwd = userDe.pwd;
    let users = usersDAl.getUsers();
    for (let i = 0; i < users.user.length; i++) {
        if (users.user[i].username == username && users.user[i].pwd == pwd) {
            return true;
        }

    }

    return false;

}
exports.getusersMaster = async () => {
    let resp = await usersDAl.getAPIUsers();
    let users = resp.data;
    let usersName = users.map(x => ({ name: x.name, id: x['id'] }))
    return usersName;
}
exports.getuserDetails=async(id)=>{
    let resp=await usersDAl.getAPIUsers(id);
    let data=resp.data;
    return data;
}