const orderModel = require("../../models/orderProductModel");

const orderController = async(req,res)=>{
    try{
        const currentUserid = req.userid;
        
        // const orderList = await orderModel.findById(userid:currentUserid).sort({createdAt:-1})
        const orderList = await orderModel.find({ userid: currentUserid }).sort({ createdAt: -1 });

        console.log("first",orderList)
        res.status(200).json({
            data: orderList,
            message: "Order List",
            success: true,
        })

    }catch(err){
        res.status(500).json({
            message: err.message || err,
            success:false,
            error: true,
        })
    }
}
module.exports = orderController