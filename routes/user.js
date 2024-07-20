import express from "express";
import { User } from "../models/user.js";
import { blockUser, getAllUsers,  getUserDetails,logOut,loginFunc,newRegister, unblockUser, userCount  } from "../controller/user.js";
import { isAuthenticated } from "../middleware/auth.js";


const router = express.Router()

router.post("/new",newRegister)     
router.post("/login",loginFunc)

router.get("/all",getAllUsers)
router.get("/logout",logOut)
router.get("/usercount",userCount)
router.put("/block/:id", blockUser)
router.put("/unblock/:id", unblockUser)



router.get( "/me",isAuthenticated,getUserDetails)

export default router;
