const mongoose= require('mongoose');
require('dotenv').config();
exports.databaseconnection=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(console.log('connection established'))
    .catch((error)=>{
        console.log((error.message))
    })
}