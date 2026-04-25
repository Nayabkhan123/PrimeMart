const productModel = require("../models/productModel")

async function getAllProducts(req,res){
    try{
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 50
        const skip = (page - 1) * limit

        const [allProducts, totalCount] = await Promise.all([
            productModel.find()
                .sort({createdAt: -1})
                .limit(limit)
                .skip(skip)
                .lean(), // Use lean() for faster queries
            productModel.countDocuments()
        ])

        res.status(201).json({
            success: true,
            error: false,
            data:allProducts,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalProducts: totalCount,
                hasMore: skip + allProducts.length < totalCount
            },
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