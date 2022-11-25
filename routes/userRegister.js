const express=require("express")
const router=express.Router()
const {newUserRegister,customerLogin}=require("../controller/customerRegister")


router.route("/userRegister")
.post(newUserRegister)

router.route("/userLogin")
.post(customerLogin)





module.exports=router