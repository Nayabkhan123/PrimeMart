const jwt = require('jsonwebtoken')
async function authToken(req,res,next){
    try{
        const token = req.cookies?.token 
        // || req.headers.authorization.split(" ")[1];
        // ||req.header
        // console.log("first" , req.cookies)
        if(!token){
            return res.status(401).json({
                message: "User not Login",
                error:true,
                success:false,
            })
        }
        
        jwt.verify(token,process.env.TOKEN_SECRET,function(err,decode){
            console.log(err)
            console.log("decoded ",decode)
            if(err){
                console.log("error auth" ,err)
            }
            req.userid = decode?._id
            next(); 
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            data:[],
            error:true,
            message:err.message || err
        })
    }
}
module.exports=authToken