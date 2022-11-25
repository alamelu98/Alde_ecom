const asyncWrapper=require("../middleware/async")
const Order=require("../models/orders")
const Product=require("../models/products")
const BadRequestError=require("../error/badrequest")






const viewOrder=asyncWrapper(async(req,res)=>
{
    const orders=await Order.find()
    res.status(200).json({message:"viewOrder",allorders:orders})
})
const updateOrder=asyncWrapper(async(req,res)=>
{
    const id=req.params.orderId
    const {trackingno,status}=req.body
    if(!trackingno || !status)
    {
        throw new BadRequestError("Updates not given")

    }
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









module.exports={viewOrder,viewOneOrder,updateOrder}