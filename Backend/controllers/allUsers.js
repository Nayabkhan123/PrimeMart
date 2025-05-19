const userModel = require("../models/userModel")

async function allUsers(req,res){
    try{
        const allusers = await userModel.find();
        
        res.json({
            message:"All users",
            data:allusers,
            success:true,
            error:false
        })
    }
    catch(err){
        res.status(400).json({
            success: false,
            error: true,
            message: err.message || err,
        })
    }
}
module.exports=allUsers