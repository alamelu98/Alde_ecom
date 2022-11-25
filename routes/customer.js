const express=require("express")
const router=express.Router()
const {viewOneOrder,reviewOrder,createOrder}=require("../controller/placeOrder")
router.route("/")
.post(createOrder)



router.route("/:orderId")
.patch(reviewOrder)
.get(viewOneOrder)



module.exports=router