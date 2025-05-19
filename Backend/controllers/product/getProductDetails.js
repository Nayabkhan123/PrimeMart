const productModel = require("../../models/productModel")
const getProductDetails = async(req,res)=>{
    try{
        const {productId} = req.body
        console.log("product id abhi wala",productId)
        const product = await productModel.findById(productId);
        console.log("product data abhi wala" , product)
        res.json({
            data: product,
            message: "OK",
            error: false,
            success: true,
        })
    }
    catch(err){
        res.json({
            message: err?.message || err,
            error : true,
            success: false,
        })
    }
}
module.exports = getProductDetails