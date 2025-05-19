const productModel = require("../../models/productModel")


const getCategoryWiseProducts = async(req,res)=>{
    try{
        const {category} = req?.body || req?.query
        const product = await productModel.find({category})
        res.json({
            data: product,
            message: `All products are fetched of category ${category}`,
            success: true,
            error: false
        })
    }catch(err){
        res.status(400).json({
            success:false,
            error:true,
            message:err.message || err
        })
    }
}
module.exports = getCategoryWiseProducts