const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productName:String,
    brandName:String,
    category:String,
    productImage:Array,
    description:String,
    price:Number,
    sellingPrice:Number,
},{
    timestamps:true
})

// Add indexes for faster queries
productSchema.index({ category: 1 })
productSchema.index({ productName: 'text', category: 'text' })
productSchema.index({ createdAt: -1 })
productSchema.index({ brandName: 1 })

const productModel = mongoose.model("product",productSchema)
module.exports = productModel