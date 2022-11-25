const asyncWrapper=require("../middleware/async")
const BadRequestError=require("../error/badrequest")
const UnAuthError=require("../error/unauthenticated")

const CustomerLogin=require("../models/customerlogin")



const customerLogin=asyncWrapper(async(req,res)=>
{
    const{email,password,}=req.body
    if(!email || !password)
    {
        throw new BadRequestError("Please provide the required values")

    }
    const customer=await CustomerLogin.findOne({email})

    if(!customer)
    {
        throw new UnAuthError("Customer not found")

    }

    const isSame=customer.compareCustomerPassword(password)

    if(!isSame)
    {
        throw  new UnAuthError("Password is incorrect")

    }
    const token=customer.getToken()

    res.status(200).json({message:"Successfully loggedn in",userToken:token})

})
const newUserRegister=asyncWrapper(async(req,res)=>
{
    const tempUser=await CustomerLogin.create({
        ...req.body
    })

    res.status(200).json({message:"customercreated",userdetails:tempUser})

})


module.exports={customerLogin,newUserRegister}