const mongoose = require("mongoose")

const addToCartSchema = new mongoose.Schema({
    productId: {
        ref: 'product',
        type:String,
    },
    quantity: Number,
    userId: String,
},{
    timestamps:true
})

// Add indexes for faster cart queries
addToCartSchema.index({ userId: 1 })
addToCartSchema.index({ userId: 1, productId: 1 }, { unique: true })

const addToCartModel = mongoose.model("addToCart",addToCartSchema)
module.exports = addToCartModel