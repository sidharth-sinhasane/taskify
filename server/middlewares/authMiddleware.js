const jwt=require('jsonwebtoken')
const {User}=require('../db/models')
require('dotenv').config({path:'../.env'})

const authenticateJWT= async function(req,res,next){
    const token=req.cookies.token;
    console.log("inside auth")
    if(token){
        try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
        const user= await User.findById(decoded.userId)

        if(!user){
            return res.status(400).json("incorrect token")
        }

        req.user=user
        next()
    }
    catch(error){
        return req.status(400).json({message:error.message})
    }

    }
    else{
        res.status(400).json({message:"no token provided"})
    }
}


module.exports={authenticateJWT}