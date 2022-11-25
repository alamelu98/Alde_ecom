require("dotenv").config()
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")


const CustomerLoginSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name Required"],
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Email needed"],
        
    },
    password:{
        type:String,
        required:[true,"Password Required"],
        trim:true
    },
    phoneNumber:{
        type:Number,
        required:[true,"Number Required"],
        trim:true
    },
    address:{
        type:String,
        required:[true,"Address REQUIRED"],
        trim:true
    },
    pincode:{
        type:Number,
        requires:[true,"pin required"]
    },
   

})

CustomerLoginSchema.pre("save",async function(next)
{
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()
})
CustomerLoginSchema.methods.compareCustomerPassword=async function(userPassword)
{
    const isSame= await bcrypt.compare(userPassword,this.password)
    return isSame
}

CustomerLoginSchema.methods.getToken=function()
{
    const token=jwt.sign({Customerid:this._id,customerEmail:this.email,cusstomerUsername:this.name},process.env.JWT_SECRET_CUSTOMER,{expiresIn:process.env.JWT_EXPIRY})
    return token
}


module.exports=mongoose.model("CustomerLogin",CustomerLoginSchema)