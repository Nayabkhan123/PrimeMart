const addToCartModel = require("../../models/cartProduct")

const removeProductFromCart = async(req,res)=>{
    try{
        const {productId} = req.body
        const product = await addToCartModel.findByIdAndDelete(productId)
        res.json({
            message: "Product removed from cart successfully",
            removedProduct: product,
            success: true,
            error: false,
        })
    }
    catch(err){
        res.json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}
module.exports = removeProductFromCart