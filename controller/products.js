const Product=require("../models/products")
const asyncWrapper=require("../middleware/async")
const BadRequestError=require("../error/badrequest")
const UnAuthError=require("../error/unauthenticated")



const viewProduct=asyncWrapper(async(req,res)=>
{
    const product=await Product.find()
    res.status(200).json({message:"viewProduct",productsare:product})
})
const createProduct=asyncWrapper(async(req,res)=>
{

        const product=await Product.create({...req.body})
        res.status(200).json({message:"createProduct",productare:product})

   
})
const updateProduct=asyncWrapper(async(req,res,next)=>
{
    const id=req.params.prodId
    const product=await Product.findByIdAndUpdate(id,{...req.body})
    if(!product){
        throw new BadRequestError("product not found")
    }
    res.status(200).json({message:"updateProduct"})
})
const viewOneProduct=asyncWrapper(async(req,res,next)=>
{
    const id=req.params.prodId
    const product=await Product.findById(id)
    if(!product){
        throw new BadRequestError("Product not found")
    }
    res.status(200).json({message:"viewOneProduct",productis:product})
})
const deleteProduct=asyncWrapper(async(req,res,next)=>
{
    const id=req.params.prodId
    const product=await Product.findByIdAndDelete(id)
    if(!product){
        throw new BadRequestError("Pproduct not found")
    }
    res.status(200).json({message:`product with id${id} deleted`})
})



module.exports={viewProduct,createProduct,updateProduct,viewOneProduct,deleteProduct}