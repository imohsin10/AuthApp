const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.authentication =(req,res,next)=>{
    
   
  try{
    const {token}=req.body 
    console.log(token);
 if(!token){ 
        return res.statusus(404).json({
            success: false,
            message:"token is missing"
        })
    }
    try{
        const  decoded=jwt.verify(token,process.env.SECRET_KEY)
        req.user=decoded
       
 
    } catch(err){

   return  res.status(403).json({
        success: false,
        message:"invalid token"
    })
    
    
    }
    next()


  }catch(e){return res.status(500).json({
    success: false,
    message:"error while verifying token"
  })
  }
}