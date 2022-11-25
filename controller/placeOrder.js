const asyncWrapper=require("../middleware/async")
const {CustomAPIError}=require("../error/customerror")
const Order=require("../models/orders")
const Product=require("../models/products")
const customerlogin = require("../models/customerlogin")
const BadRequestError=require("../error/badrequest")
const UnAuthError=require("../error/unauthenticated")





const createOrder=asyncWrapper(async(req,res,next)=>
{
        const product=await Product.findById(req.body.productId)
        if(!product)
        {
            throw new BadRequestError("Order not found")
        }
        const productId=product._id
        const{quantity,paid_amount}=req.body

        const id=req.user.cust_id
        const customerDetails=await customerlogin.findById(id)
        if(!customerDetails){
            throw new UnAuthError("Customer Not found")
        }
        const email=await customerDetails.email
        const password=await customerDetails.password
        const username=await customerDetails.name
        
        const orderDetails={
            quantity:quantity,
            paid_amount:paid_amount,
            productId:productId,
            email:email,
            password:password,
            username:username
        }

        const order=await Order.create({...orderDetails})

        res.status(200).json({message:order})
 
 
    })

const reviewOrder=asyncWrapper(async(req,res)=>
{
    const id=req.params.orderId
    const order=await Order.findByIdAndUpdate(id,{...req.body})
    if(!order)
    {
        throw new BadRequestError("Order not found")
    }
    res.status(200).json({message:"updateOrder"})
})
const viewOneOrder=asyncWrapper(async(req,res)=>
{
    const id=req.params.orderId
    const order=await Order.findById(id)
    if(!order)
    {
        throw new BadRequestError("Order not found")
    }
    
    res.status(200).json({message:order})
})









module.exports={viewOneOrder,reviewOrder,createOrder}