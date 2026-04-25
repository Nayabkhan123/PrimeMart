const mongoose = require('mongoose')

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

// Add indexes for faster order queries
orderSchema.index({ userid: 1, createdAt: -1 })
orderSchema.index({ email: 1 })
orderSchema.index({ 'paymentDetails.paymentId': 1 })

const orderModel = mongoose.model('order',orderSchema)
module.exports = orderModel