const mongoose=require('mongoose')


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
    title: {
        type:String,
        required:true
    },
    userId : mongoose.Schema.ObjectId,
    completed : Boolean
})


const User= mongoose.model('User',userSchema)
const Todo=mongoose.model('Todo',todoSchema)


module.exports={
    User,
    Todo
}