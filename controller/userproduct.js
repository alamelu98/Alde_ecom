const asyncWrapper = require("../middleware/async");
const UserProduct=require("../models/userproduct")
const CustomerLogin=require("../models/customerlogin")
const UnAuthError=require("../error/unauthenticated")



const loginProduct=asyncWrapper(async(req,res)=>
{
    const tempUser={
        username:"ALDE123",
        password:"Alde@345"
    }
    console.log("hello")

    await UserProduct.create({...tempUser})
    
    res.status(200).json({message:"Login with your username and password"})
})

const enterlogin=asyncWrapper(async(req,res)=>
{
    const {username,password}=await req.body
    if(!username || !password){
      throw  new UnAuthError("Enter the details")    }
    const user=await UserProduct.findOne({username})
    if(!user)
    {
        throw new UnAuthError("Customer not found")    }
    const isSamePass=await user.compareUserPassword(password)
    if(!isSamePass)
    {
       throw new UnAuthError("Invalid Password")    }
    const token=user.getToken()

    res.status(200).json({message:"Succesfully logged in",user_token:token})
})

const viewAllCustomer=asyncWrapper(async(req,res)=>
{
    const allUsers=await CustomerLogin.find()

    res.status(200).json({items:allUsers})
})

module.exports={loginProduct,enterlogin,viewAllCustomer}
