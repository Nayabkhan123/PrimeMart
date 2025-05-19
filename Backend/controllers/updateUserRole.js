const { default: mongoose } = require("mongoose");
const userModel = require("../models/userModel")


async function updateUserRole(req,res){
    try{
        const sessionuser = req.userid;
        const {userid,role} = req.body
        // if(!role){
        //     throw new Error("role is not provided")
        // }
        const user = await userModel.findById(sessionuser)
        console.log("sessionuser ",user)
        const updateduser = await userModel.findOneAndUpdate({_id:new mongoose.Types.ObjectId(userid)},{role:role},{new:true})
        // const saveuser = await user.save();
        console.log(user)
        res.status(200).json({
            success:true,
            error:false,
            message:"User Role Updated Successfully",
            updatedRole:role,
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            error:true,
            message:err.message||err,
        })
    }
}
module.exports = updateUserRole