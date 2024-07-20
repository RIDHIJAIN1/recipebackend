import mongoose from "mongoose";

  const schema = new mongoose.Schema({
       title:{
        type:String,
        required: true,
       },
       image:{
         type:String,
         required:true,
       },
    ingredients:{
     type:String,
     required: true,
    },
    description:{
      type:String,
      required: true,
      // select:false
    },

    cookTime:{
        type:Number,
        required:true
    },
    
    createdAt:{
      type:Date,
      default:Date.now
    }
 
  });

 export const Recipe = mongoose.model("Recipe",schema);