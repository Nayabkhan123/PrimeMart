const addToCartModel = require("../../models/cartProduct")
const updateAddToCartProduct = async(req,res)=>{
    try{
        const currentUser = req.userid
        const addToCartProductId = req.body.id
        // console.log("addToCartProductId",addToCartProductId)
        const qty = req.body.quantity
        // console.log("quantity",qty)
        const updateProductQuantity = await addToCartModel.findByIdAndUpdate(addToCartProductId,{
            ...(qty && {quantity:qty}) 
        })
        res.json({
            data: updateProductQuantity,
            message: "add to cart quantity updated successfully",
            error: false,
            success: true
        })
    }catch(err){
        res.json({
            success:false,
            error:true,
            message:err.message || err
        })
    }
}

module.exports = updateAddToCartProduct