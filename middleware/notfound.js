const notfound=(req,res)=>
{
 res.status(404).json({message:"Not found -Route doesnt exist"})   
}

module.exports=notfound