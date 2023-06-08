const User = require('../model/user')
const Order = require('../model/order');
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const { patch } = require('../routes/user');
const { response } = require('express');
require('dotenv').config();



exports.handleSignUp = async (req, res) => {
    try {

        const { name, phoneNumber, password } = req.body;

        const existingUser = await User.findOne({ phoneNumber })
        if (existingUser) {
            return res.status(400).json({ message: 'user already exist ,please login' })
        }
        if (!name || !phoneNumber || !password) {
            return res.status(400).json({ message: 'all fields required' })
        }
        try {
            let hashpassword = await bcrypt.hash(password, 12)
            const user = await User.create({
                name: name,
                phoneNumber: phoneNumber,
                password: hashpassword,
            })
            id = user._id
            const payload = {
                id: id,
                phoneNumber: user.phoneNumber,
                password: user.password

            }
            const token = jwt.sign(payload, process.env.SECRET_KEY,
                {
                    expiresIn: '2h'
                })
            console.log(token)

            res.cookie('jwt', token, { httpOnly: true, maxAge: 96 * 60 * 60 * 1000 }).json({ success: true, token, id })

        } catch (err) {
            res.status(400).json({ message: err, })
        }


    }


    catch (err) {
        return res.status(401).json({ message: err.message })
    }
}


exports.handleSignIn = async (req, res) => {

    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
        return res.status(401).json({ message: "please enter all the field" })

    }
    let userexist = await User.findOne({ phoneNumber: phoneNumber })
    if (!userexist) {
        return res.status(401).json({ message: "please signup first " })
    }
    id = userexist._id
    const payload = {
        id: userexist._id,
        phoneNumber: userexist.phoneNumber,
        password: userexist.password,
    }
    const UserAuthenticate = await bcrypt.compare(password, userexist.password)

    if (await bcrypt.compare(password, userexist.password)) {
        const token = jwt.sign(payload, process.env.SECRET_KEY,
            {
                expiresIn: '2h'
            })

        userexist = userexist.toObject();
        userexist.token = token;
        userexist.password = undefined;

        return res.cookie('jwt', token, { httpOnly: true, maxAge: 96 * 60 * 60 * 1000 }).json({ success: true, token, userexist })

    }

    else {
        return res.status(401).json({ message: 'invalid password' })
    }



}

exports.handleAddorder = async (req, res) => {
    try {

        let ids=req.user.id
        const { subTotal, phoneNumber,token } = req.body

        if (!ids) {
            return res.status(404).json({
                success: false,
                message: 'unauthorized access'
            })
            return res.status(200).json({
                 success: true, message: "success" })
        }
        if (!phoneNumber || !subTotal) {
            return res.status(403).json({
                success: false, message: "all fields are required"
            })


        }
            try{
                
                const createdOrder = await Order.create({
                    UserId: ids,
                    phoneNumber: phoneNumber,
                    subTotal:subTotal,
                })
                return res.status(200).json({success:true,createdOrder,message:"created order"})

            }catch(e){
                return res.status(400).json({message:e})
            }



    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "wrong"
        }
        )
    }

}

exports.handleAllOrder= async (req,res)=>{


      
    try{
        let id=req.params.id
        console.log(id)
     const order=await  Order.find({UserId:id});
     console.log(order)
     if(!order){
        return res.status(200).json({message:"no order found"})
     }
     else
     {
        return res.status(200).json({success: true,message:"order details",order})
     }

    }catch(err){
        return res.status(500).json({message:err})

    }

}
