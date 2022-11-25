const express=require("express")
const router=express.Router()
const {viewAllCustomer}=require("../controller/userproduct")
const {viewProduct,createProduct,updateProduct,viewOneProduct,deleteProduct}=require("../controller/products")
const {viewOrder,viewOneOrder,updateOrder}=require("../controller/orders")
router.route("/orders")
.get(viewOrder)

router.route("/orders/:orderId")
.patch(updateOrder)
.get(viewOneOrder)

router.route("/products")
.get(viewProduct)
.post(createProduct)



router.route("/products/:prodId")
.patch(updateProduct)
.get(viewOneProduct)
.delete(deleteProduct)



router.route("/customers")
.get(viewAllCustomer)



module.exports=router