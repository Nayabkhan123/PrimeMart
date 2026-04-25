const productModel = require("../../models/productModel")

const getCategoryWiseProducts = async(req,res)=>{
    try{
        const {category} = req?.body || req?.query
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 20
        const skip = (page - 1) * limit

        const [product, totalCount] = await Promise.all([
            productModel
                .find({category})
                .limit(limit)
                .skip(skip)
                .lean(),
            productModel.countDocuments({category})
        ])

        res.json({
            data: product,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalProducts: totalCount,
                hasMore: skip + product.length < totalCount
            },
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