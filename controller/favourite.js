
import { Favourite } from "../models/favourite.js";
import { Recipe } from "../models/recipe.js";

export const addFavourite = async (req, res, next) => {
  const { recipeId } = req.body;
  const userId = req.user._id; 

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    const existingFavourite = await Favourite.findOne({ userId, recipeId });

    if (existingFavourite) {
      return res.status(400).json({
        success: false,
        message: "Recipe already in favorites",
      });
    }
    await Favourite.create({
      userId,
      recipeId,
    });

    res.status(201).json({
      success: true,
      message: "Recipe added to favorites",
    });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// ------------------------------getRecipes---------------------------------
 
export const getFavouriteRecipe = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const favourites = await Favourite.find({ userId }).populate('recipeId');

    const recipes = favourites.map(fav => fav.recipeId);

    res.status(200).json({
      success: true,
      recipes,
    });
  } catch (error) {
    console.error("Error fetching favourite recipes:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//  -----------------------------deleteFavourite----------------------------------

export const deleteFavourite = async (req, res, next) => {
  const userId = req.user._id;
  const recipeId = req.params.id;

  try {
    const favourite = await Favourite.findOneAndDelete({ userId, recipeId });

    if (!favourite) {
      return res.status(404).json({
        success: false,
        message: "Favourite not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Favourite deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting favourite:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};