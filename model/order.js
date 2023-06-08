
const mongoose = require('mongoose')

const orderSchema=new mongoose.Schema({
    UserId:{
       type: 'String',
       required:true,
      
       
    },
    phoneNumber:{
        type: 'Number',
        required:true,
       
      
    },
    subTotal:{
        type:Number,
        required:true,
        
    }
})
module.exports=mongoose.model('Order',orderSchema)