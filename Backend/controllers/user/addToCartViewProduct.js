const addToCartModel = require("../../models/cartProduct")

const addToCartViewProduct = async(req,res)=>{
    try{
        const currentUser = req.userid
        const allProducts = await addToCartModel.find({userId:currentUser}).populate("productId")
        res.json({
            data: allProducts,
            success: true,
            error: false,
            message: "All product present inside Cart"
        })
    }catch(err){
        res.json({
            message: err.message || err,
            success: false,
            error: true,
        })
    }
}
module.exports = addToCartViewProduct