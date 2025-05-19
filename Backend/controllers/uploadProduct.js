const uploadProductPermission = require("../helper/uploadProductPermission")
const productModel = require("../models/productModel")


async function uploadProductController(req,res) {
    try{
        const sessionuserid = req.userid
        if(!uploadProductPermission(sessionuserid)){
            throw new Error("Permission Denied")
        }
        const UploadProduct = new productModel(req.body)
        const saveProduct = await  UploadProduct.save()
        console.log("Product details",saveProduct)
        res.status(201).json({
            message: "Product Upload Successfully",
            success: true,
            error: false,
            data: saveProduct
        })
    }
    catch(err){
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = uploadProductController