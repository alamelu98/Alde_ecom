const express=require("express")
const router=express.Router()
const {loginProduct,enterlogin}=require("../controller/userproduct")


router.route("/product")
.get(loginProduct)
.post(enterlogin)




module.exports=router