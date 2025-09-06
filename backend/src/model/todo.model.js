import mongoose from 'mongoose'

const todoSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,

    },
    task:{
        type:String,
        required:true,

    },
    description:{
        type:String,


    },
    time:{
        type:String,

    },
    status:{
        type:String,
        enum:["pending","done"],default:"pending"

    }

},{timestamps:true})

export default mongoose.model("Todo", todoSchema);