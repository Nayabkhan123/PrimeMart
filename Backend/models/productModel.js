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
const productModel = mongoose.model("product",productSchema)
module.exports = productModel