const express=require('express')
const mongoose=require('mongoose')
const {functionalRout} = require('./routs/functionalRouts');
const {signUp,signIn}=require('./routs/authRouts')

require('dotenv').config();
const app=express()

const connectToDatabase = async function (){
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to database")
    }
    catch(error){
        console.log("connection failed",error)
        process.exit(1)
    }
}

app.use(express.json())


app.use('/todos',functionalRout)
app.use('/signup',signUp)
app.use('/signIn',signIn)

app.get('/',(req,res) => {
    res.json({message : "app running"})
})

connectToDatabase();
app.listen(3000)