const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const {User}=require('../db/models')
require('dotenv').config({path:"../.env"});

const signUp=express.Router()
const signIn=express.Router()


signUp.post('/', async function(req,res){
    try{
        
    const {username,password}=req.body
    if(!username || !password){
        console.log("give username password")
        return res.status(400).json({message: "give correct creditials"});
    }
    const existingUser=await User.findOne({userName:username})
    if(existingUser){
        return res.status(200).json({message:"user allready exist"})
    }

    const ispasswordcorrect=await bcrypt.hash(password,10)

    const newuser=new User({
        userName:username,
        password:ispasswordcorrect
    })

    await newuser.save()

    res.status(200).json({
        message:"new user created",
        username:username,
        password:password
    })
    }
    catch(error)
    {
        res.status(500).json(error.message)
    }
    
})
signIn.post('/',async function(req,res){
    try{
        const {username,password}=req.body
        if(!username || !password){
            return res.status(400).json("give all cr")
        }
        const existingUser=await User.findOne({userName:username})
        if(!existingUser){
            return res.status(400).json({message: "wrong username"})
        }

        console.log(existingUser.password,password)
        const ispasswordcorrect=await bcrypt.compare(password,existingUser.password)
        if(!ispasswordcorrect){
            return res.status(400).json({message: "wrong password"})
        }

        const token=jwt.sign(
            { userId: existingUser._id, username: existingUser.userName },
            process.env.JWT_SECRET)

        res.cookie('token',token,{
            httpOnly:true,
            maxAge:3600000
        })

        res.status(200).json({message:"signup succesfull",
            token:token
        })
    }
    catch(error)
    {
        res.status(500).json({message: error.message})
    }
})
module.exports={
    signIn,
    signUp
};