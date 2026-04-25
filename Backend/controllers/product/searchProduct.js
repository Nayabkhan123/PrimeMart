const productModel = require("../../models/productModel")

const seachProduct = async(req,res)=>{
    try{
        const query = req.query.q
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 20
        const skip = (page - 1) * limit

        // Use text index for faster search
        const [product, totalCount] = await Promise.all([
            productModel
                .find({ $text: { $search: query } })
                .limit(limit)
                .skip(skip)
                .lean(),
            productModel.countDocuments({ $text: { $search: query } })
        ])

        res.json({
            data: product,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalResults: totalCount,
                hasMore: skip + product.length < totalCount
            },
            message: "Search Product List",
            success: true
        })
    }
    catch(err){
        res.json({
            message: err.message || err,
            success:false,
            error: true,
        })
    }
}
module.exports = seachProduct