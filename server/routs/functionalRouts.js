const express=require('express')
const functionalRout=express.Router()
const {Todo}=require('../db/models')

functionalRout.get('/view',function(req,res){
    res.status(200).json({message: "inside the view rout"})
})

functionalRout.post('/add',function(req,res){
    res.status(200).json({message: "inside add rout"})
})

functionalRout.put('/update',function(res,res){
    res.status(200).json({message:"inside update rout"})
})

functionalRout.delete('/remove',function(req,res){
    res.status(200).json({message:"inside remove rout"})
})


module.exports={functionalRout};