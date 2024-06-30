import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {addFavourite ,getFavouriteRecipe,deleteFavourite} from "../controller/favourite.js"

const router = express.Router();

router.post("/addfavs",isAuthenticated,addFavourite);
router.get("/getfavourites",isAuthenticated,getFavouriteRecipe);
router.delete("/:id",isAuthenticated,deleteFavourite);

export default router;

