const userModel = require("../models/userModel")


async function uploadProductPermission (userid){
    const user = await userModel.findById(userid);
    if(user.role!=='ADMIN'){
        return false
    }
    return true
}
module.exports = uploadProductPermission