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

const userSchema= new mongoose.Schema({
    userName : {
        type:String,
        required :true
    },
    password :{
        type:String,
        required :true
    }
})

const todoSchema = new mongoose.Schema({
    title: String,
    userId : mongoose.Schema.ObjectId,
    completed : Boolean
})


const User= mongoose.model('User',userSchema)
const Todo=mongoose.model('Todo',todoSchema)

// const mytodo=new Todo ({
//     title : "pack tifin",
//     completed : false
// })

// const somtodos= Todo.find()
// console.log(somtodos)

module.exports={
    connectToDatabase,
    User,
    Todo
}