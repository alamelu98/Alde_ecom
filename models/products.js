const mongoose=require("mongoose")


const ProductSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"Product name is must"],
    },
    price:{
        type:Number,
        required:[true,"Price is must"]
    },
    styles:{
        type:String,
        required:[true,"Varieties in styles is must"]

    },
    stockQuantity:{
        type:Number,
        required:[true,"Stock quantity is needed"],
        default:1
    },
    inStock:{
        type:Boolean,
        required:[true,"stock availablity should be mentioned"],
        default:false
    }


})




module.exports=mongoose.model("Product",ProductSchema)