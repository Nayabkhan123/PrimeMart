const mongoose = require('mongoose')
const productModel = require('./productModel')
const getProductDetails = require('../controllers/product/getProductDetails')

const orderSchema = new mongoose.Schema({
    productDetails:{
        type: Array,
        default:[]
    },
    email:{
        type:String,
        default:""
    },
    userid:{
        type:String,
        default:""
    },
    paymentDetails:{
        paymentId:{
            type:String,
            default:""
        },
        payment_method_type:[],
        payment_status:{
            type:String,
            default:""
        }
    },
    shipping_options:[],
    totalAmount:{
        type:Number,
        default:0
    },
    
},{
    timestamps: true
})
const orderModel = mongoose.model('order',orderSchema)
module.exports = orderModel