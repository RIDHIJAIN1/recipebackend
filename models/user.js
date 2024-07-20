import mongoose from "mongoose";

  const schema = new mongoose.Schema({
    name:{
        type:String,
        // unique:true,
        required: true,
       },
    email:{
     type:String,
    //  unique:true,
     required: true,
    },
    password:{
      type:String,
      required: true,
      select:false
    },
    createdAt:{
      type:Date,
      default:Date.now
    },
    blocked:{
      type:Boolean,
      default:false
    },
    isAdmin: {
      type: Boolean,
      default: false,
    }

    
  });

 export const User = mongoose.model("User",schema);