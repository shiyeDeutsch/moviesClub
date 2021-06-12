const usersDAL = require('../DAL/jsonDAL');

exports.isUserValid = async function (username, pwd) {
  let usersData = await usersDAL.getUsers();
  // console.log(usersData)
  let user = usersData.find(x => x.userName == username && x.pwd == pwd);
  //  console.log(user)
  // console.log(user.admin)

  if (typeof user == 'object') {
    if (user.admin) {
      return obj = {
        id: user.id,
        username: user.userName,
        valid: true,
        admin: true
      }
    }
    if (user.dailyActions <= user.maxDailyActions) {
      return obj = {
        id: user.id,
        username: user.userName,
        valid: true,
        admin: false,
        maxDailyActions: user.maxDailyActions,
        dailyActions: user.dailyActions
      }
    }
  }
  return obj = { valid: false, admin: false }
}
