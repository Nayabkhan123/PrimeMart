const addToCartModel = require("../../models/cartProduct")

const addToCartController=async(req,res)=>{
    try{
        const {productId} = req.body
        // console.log("productId  ",productId)
        const currentUser = req.userid
        const isProductAvailable = await addToCartModel.findOne({productId,userId: currentUser})
        console.log("isProductAvailable  ",isProductAvailable)
        if(isProductAvailable){
            return res.json({
                message: "Already exists in Cart",
                success:false,
                error:true,
            })
        }
        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
        }
        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()
        return res.json({
            data: saveProduct,
            message: "Item Added Successfully",
            error:false,
            success:true
        })
    }
    catch(err){
        res.json({
            message:err?.message || err,
            error:true,
            success:false,
        })
    }
}
module.exports = addToCartController