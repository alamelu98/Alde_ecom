const mongoose=require("mongoose")


const OrderSchema=mongoose.Schema({
    quantity:{
        type:Number,
        default:1
    },
    paid_amount:{
        type:Number,
        required:[true,"Paid amount required"]
    },
    trackingno:{
        type:Number,
       default:001
    },
    status:{
        type:String,
        enum:['booked','dispatched','shipped','delivered'],
        default:'booked'

    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"Product Id is required"]
    },
    password:{
        type:String,
        required:[true,"password required"]
    },
    email:{
        type:String,
       
        
        required:[true,"Email needed"],
    },username:{
        type:String,
        requires:[true,"Username required"],
        unique:true,
    }


})


module.exports=mongoose.model("Orders",OrderSchema)