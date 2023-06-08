const express=require('express')
const router=express.Router();

const {handleSignUp,handleSignIn,handleAddorder,handleAllOrder}=require("../controller/user")
const {authentication}=require('../middleware/auth')
router.post('/signup',handleSignUp)
router.post('/signin',handleSignIn)
router.post('/order',authentication,handleAddorder)
router.get('/order/:id',handleAllOrder)


module.exports = router;