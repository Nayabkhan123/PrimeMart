async function userLogoutController(req,res){
    try{
        const tokenOption = {
            httpOnly:true,
            secure:true,
            sameSite: "None"
        }
        res.clearCookie("token",tokenOption);
        return res.status(200).json({
            success:true,
            error:false,
            message:"User Logout Successfully",
            data:[]
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            error:true,
            message:err.message||err,
        })
    }
}
module.exports=userLogoutController