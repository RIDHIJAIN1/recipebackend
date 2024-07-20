import { User } from "../models/user.js";
import bcrypt, { hash } from "bcrypt";
import jwt from 'jsonwebtoken';
import { Recipe } from "../models/recipe.js";


// import { sendCookie } from "../utils/feature.js";



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

 console.log(process.env.JWT_SECRET);
 const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
 console.log(token);

  res.status(201).json({
    success:true,
    token,
    message:'Registered Successfully'
  })

 
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
   
    if (user.blocked) {
      return res.status(403).json({ success: false, message: 'User is blocked' });
    }

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

    const isAdmin = user.isAdmin;
     const token = jwt.sign({ id: user._id , isAdmin}, process.env.JWT_SECRET, { expiresIn: '1d' });
   

  res.status(201).json({
    success:true,
    token,
    message:`Welcome back, ${user.name}`
  })
}

//-----------------userCount-------------------------
export const userCount = async(req,res)=>{
  try{
    const usersCount = await User.countDocuments();
    const recipeCount = await Recipe.countDocuments();
    res.json({
      success: true,
      usersCount,
      recipeCount
    });
  }
  catch (error) {
    console.error("Error fetching total recipes:", error);
    res.status(500).json({ error: "Error fetching total recipes" });
  }
  
}

// --------------------------logout----------------------------

export const logOut = (req , res)=>{
 

    res.status(200)
    .json({
        success:true,
        message:"Logged Out Successfully",
        user: req.user
    })
}

//----------------------blockeduser------------------------------

export const blockUser = async(req , res)=>{
   try{
    const user = await User.findByIdAndUpdate(req.params.id , {blocked : true},{new:true});
    if(!user){
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
   }
   catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const unblockUser = async(req , res)=>{
   try{
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.blocked = false;
    await user.save();

    res.json({ success: true, message: 'User unblocked successfully' });

   }
   catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

