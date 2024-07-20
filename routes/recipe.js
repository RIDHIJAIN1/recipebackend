import express from "express";
// import {Recipe} from "../models/recipe.js"
import { countRecipe, deleteRecipe, getRecipe, newRecipe, oneRecipe, updateRecipe } from "../controller/recipe.js";
import upload from "../middleware/upload.js";


const router = express.Router();

router.post("/new",upload, newRecipe);
router.get("/allrecipe", getRecipe);
router.get("/:id", oneRecipe);
router.get("/recipeCount", countRecipe);

router.route("/:id").put(updateRecipe).delete(deleteRecipe);


export default router;