require("dotenv").config()
const express=require("express")
const app=express()
const port= process.env.PORT || 3000

const notfound=require("./middleware/notfound")
const connectDB=require("./db/connect")
const errorHandlerMiddleware=require("./middleware/errorHandler")
const adminauth=require("./middleware/Adminauth")
const customerauth=require("./middleware/Customerauth")
 const userproductRoute=require("./routes/userproduct")
const customerregisterRoute=require("./routes/userRegister")
const adminRoute=require("./routes/admin")
const customerRoute=require("./routes/customer")


app.use(express.json())

const helmet=require("helmet");
const cors=require("cors")
const xss=require("xss-clean")
const rateLimiter=require("express-rate-limit")

app.use(helmet())
app.use(cors())
app.use(xss())

app.get("/",(req,res)=>
{
    res.send("Ecom api/")
})


app.use("/login",userproductRoute)
app.use("/admin",adminauth,adminRoute)
app.use("/customer",customerregisterRoute)
app.use("/customerOrders",customerauth,customerRoute)




app.use(rateLimiter(
    {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    }
))



app.use(notfound)
app.use(errorHandlerMiddleware)

const start=async ()=>{
    
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>
            {
            console.log("server is listening ")
            })
    }
    catch(error)
    {
        console.log(error)
    }
}

start()
