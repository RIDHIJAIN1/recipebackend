import { User } from "../models/user.js";
import bcrypt, { hash } from "bcrypt";

import { sendCookie } from "../utils/feature.js";



export const getAllUsers = async(req,res)=>{
    const users = await User.find({});
    console.log(req.query)

    res.json({
        success:true,
        users
    })
}

// ----------------------------RegisterFunction------------------------------

export const newRegister = async(req,res)=>{
const {name,email,password} = req.body;

let user = await User.findOne({email});

if(user){
    return res.status(404).json({
        success:false,
        message:"User already exist"
    })
}
const hashedPassword = await bcrypt.hash(password, 10);
    
 user = await User.create({
    name,
    email,
    password:hashedPassword,
 })

 sendCookie(user , res,"Registered Successfully",201)

 
};

// -------------------------------------getUserFunc-----------------------------
// export const getUserDetails = async(req,res)=>{
//     const {id} = req.params;
//     const user = await User.findById(id);
//     res.json({
//         success:true,
//         message:"Updated",
//     })
// }

  export const getUserDetails = (req,res)=>{
    
    res.status(200).json({
        success:true,
        user:req.user,
  })
}

// ------------------------------LoginFunc-------------------------

export const loginFunc = async(req,res,next)=>{
    const{email,password} = req.body;

    const user = await User.findOne({email}).select("+password")

    if(!user)
    return res.status(404).json({
       success: false,
       message: "Invalid email or password"
    })

    const isMatch = await bcrypt.compare(password , user.password)

    if(!isMatch)
    return res.status(404).json({
        success: false,
        message: "Invalid email or password"
     });

     sendCookie (user,res,`Welcome back, ${user.name}`,200)
}

// --------------------------logout----------------------------

export const logOut = (req , res)=>{
    res.status(200)
    .cookie("token","",{
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ?"lax" : "none",
        secure:process.env.NODE_ENV === "Development" ? false:true,
    

    })
    .json({
        success:true,
        message:"Logged Out Successfully",
        user: req.user
    })
}