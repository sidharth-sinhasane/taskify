require('dotenv').config({path : '../.env'})
const mongoose=require('mongoose')

const connectToDatabase = async function (){
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to database")
    }
    catch(e){
        console.log("connection failed",e)
        process.exit(1)
    }
}

connectToDatabase()