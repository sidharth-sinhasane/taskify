const express=require('express')
const jwd=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const {User}=require('../db/models')

const signUp=express.Router()
const signIn=express.Router()


signUp.post('/',function(req,res){
    res.status(200).json({
        message:"inside signUp rout"
    })
})
signIn.post('/',function(req,res){
    res.status(200).json({
        message:"inside signIn rout"
    })
})
module.exports={
    signIn,
    signUp
};