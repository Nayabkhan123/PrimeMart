const productModel = require("../models/productModel")

async function getAllProducts(req,res){
    try{
        const allProducts = await productModel.find().sort({createdAt: -1})
        res.status(201).json({
            success: true,
            error: false,
            data:allProducts,
            message: "Fetched All Products Successfully"
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

module.exports = getAllProducts