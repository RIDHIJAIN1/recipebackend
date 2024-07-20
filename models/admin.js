import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name:{
    type:String,
    required: true
  },
   email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
    createdAt:{
      type:Date,
      default:Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true,
      },
    
});

export const Admin = mongoose.model("Admin" , schema);