const orderModel = require("../../models/orderProductModel");

const orderController = async(req,res)=>{
    try{
        const currentUserid = req.userid;
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit
        
        const [orderList, totalCount] = await Promise.all([
            orderModel
                .find({ userid: currentUserid })
                .sort({ createdAt: -1 })
                .limit(limit)
                .skip(skip)
                .lean(),
            orderModel.countDocuments({ userid: currentUserid })
        ])

        res.status(200).json({
            data: orderList,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalOrders: totalCount,
                hasMore: skip + orderList.length < totalCount
            },
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