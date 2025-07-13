const orderModel  = require("../../models/orderProductModel")
const userModel = require("../../models/userModel")

const allOrderController = async(req,res)=>{
    try{
        const userId = req.userid
        console.log("first",userId)
        const user = await userModel.findById(userId)
        if(user.role !== 'ADMIN'){
            return res.status(500).json({
                message: "Users can't access this url"
            })
        }
        const Allorder = await orderModel.find().sort({createdAt: -1})
        return res.status(200).json({
            data: Allorder,
            success: true
        })
    }catch(err){
        return res.status(500).json({
            error: true,
            message: err.message || err,
            success: false,
            data: []
        })
    }
}
module.exports = allOrderController