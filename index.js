const express= require('express');
const app = express();
require('dotenv').config();
app.use(express.json())
const PORT=process.env.PORT ||4000
const userRoute=require('./routes/user');



const database= require('./config/databaseconnection')
database.databaseconnection();
app.use('/api/users',userRoute)









app.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`)
})

