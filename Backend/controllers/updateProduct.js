const uploadProductPermission = require("../helper/uploadProductPermission")
const productModel = require("../models/productModel")

async function updateProductController(req,res){
    try{
        if(!uploadProductPermission(req.userid)){
            throw new Error("permission denied")
        }
        // const productid = req?._id
        const {_id,...resbody} = req.body
        const updateProduct = await productModel.findByIdAndUpdate(_id,resbody)
        res.json({
            message:"Product Updated Successfully",
            data:updateProduct,
            success:true,
            error:false
        })
    }
    catch(err){
        res.status(400).json({
            success: false,
            error: true,
            message: err.message || err,
        })
    }
}
module.exports = updateProductController