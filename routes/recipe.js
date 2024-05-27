import express from "express";
// import {Recipe} from "../models/recipe.js"
import { deleteRecipe, getRecipe, newRecipe, oneRecipe, updateRecipe } from "../controller/recipe.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const router = express.Router();

router.post("/new",upload.single('image'), newRecipe);
router.get("/allrecipe", getRecipe);
router.get("/:id", oneRecipe);
router.route("/:id").put(updateRecipe).delete(deleteRecipe);


export default router;