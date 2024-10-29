const express=require('express')
const functionalRout=express.Router()
const {Todo}=require('../db/models')

functionalRout.get('/view',async function(req,res){
    try{
    const todos = await Todo.find({userId:req.user._id})
    if(todos.length===0){
        return res.status(200).json({message:"no tasks for you"})
    }
    res.status(200).json(todos)
    }catch(error)
    {
        res.status(500).json({message:error.message})
    }
})

functionalRout.post('/add',async function(req,res){
    const title=req.body.title;
    if(!title){
        return res.status(400).json({message: "title not provided"})
    }
    const newTodo=new Todo({
        title:title,
        userId:req.user._id,
        completed:false
    })
    await newTodo.save();

    res.status(200).json({message: "todo created"})
})

functionalRout.put('/update',async function(req,res){
    const title=req.body.title;
    const completed=req.body.completed;
    const todoId=req.body.todoId;

    try{
    const todo=await Todo.findOne({_id:todoId,userId:req.user._id})

    if(!todo){
        return res.status(200).json({message: "todo not exist"})
    }

    if(completed != undefined){
        todo.completed=completed;   
    }
    if(title != undefined){
        todo.title=title;
    }

    await todo.save()
    res.status(200).json(todo)
}
catch(error){
    res.status(500).json({message:error.message})
}
})

functionalRout.delete('/remove',async function(req,res){
    try{
    const toBeDeletedTodo= await Todo.findOneAndDelete(
        {userId:req.user._id,
         _id:req.body.todoId
        }
    )
    if(!toBeDeletedTodo){
        return res.status(400).json({message:"no todo exist"})
    }
    res.status(200).json({message:"todo deleted"})
}
catch(error)
{
    res.status(500).json({message:error.message})
}
})


module.exports={functionalRout};