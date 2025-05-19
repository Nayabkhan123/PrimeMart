const productModel = require("../../models/productModel")

const filterProduct = async(req,res)=>{
    try{
        const categoryList = req?.body?.category || []
        const products = await productModel.find({
            category: {
                "$in": categoryList
            }
        })
        res.json({
            data: products,
            message: "product",
            success: true,
            error: false
        })
    }
    catch(err){
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}
module.exports = filterProduct