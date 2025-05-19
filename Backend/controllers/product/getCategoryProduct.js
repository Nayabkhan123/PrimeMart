const productModel = require("../../models/productModel")

const getCategoryProduct = async(req,res)=>{
    try{
        const productCategory = await productModel.distinct("category")

        console.log("category" , productCategory)
        const productByCategory = [];
        for(const category of productCategory){
            const product = await productModel.findOne({category:category})
            if(product){
                productByCategory.push(product)
            }
        }
        res.status(200).json({
            message:"Product Categories",
            data:productByCategory,
            success:true,
            error:false
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            error:true,
            message:err.message || err
        })
    }
}
module.exports = getCategoryProduct