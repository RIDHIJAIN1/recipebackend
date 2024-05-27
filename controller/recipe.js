import ErrorHandler from "../middleware/error.js";
import { Recipe } from "../models/recipe.js";

export const newRecipe = async (req, res, next) => {
  const { title, ingredients, description, cookTime } = req.body;

  const { buffer, mimetype } = req.file;

  try {
    // Check if a recipe with the same title already exists
    const existingRecipe = await Recipe.findOne({ title });

    if (existingRecipe) {
      return res.status(400).json({
        success: false,
        message: "Recipe already exists with the same title",
      });
    }

    // Create the new recipe with the image
    await Recipe.create({
      title,
      image: {
        data: buffer,
        contentType: mimetype,
      },
      ingredients,
      description,
      cookTime,
    });

    res.status(201).json({
      success: true,
      message: "Recipe created successfully",
    });
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// -----------------------------------------GetRecipe--------------------------------

export const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.find({});
    res.json({
      success: true,
      recipe,
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching recipes",
    });
  }
};
// --------------------------------------singlerecipe--------------------
export const oneRecipe = async (req, res) => {
  const { id } = req.params;
  console.log(`Fetching recipe with ID: ${id}`); // Add this line
  try {
      const recipe = await Recipe.findById(id);
      if (!recipe) {
          return res.status(404).json({
              success: false,
              message: 'Recipe not found',
          });
      }
      console.log("Recipe found");
      res.json({
          success: true,
          recipe,
      });
      
  } catch (error) {
      console.log("Error fetching recipe:", error); // Add this line
      res.status(404).json({
          success: false,
          message: 'Recipe not found',
      });
  }
};


// ----------------------------------UpdateRecipe---------------
export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, description, cookTime } = req.body;
  try {
    const recipe = await Recipe.findById(id);

    if (!recipe) return next(new ErrorHandler("Invalid", 404));

    recipe.title = title;
    recipe.description = description;

    recipe.ingredients = ingredients;
    recipe.cookTime = cookTime;

    await recipe.save();

    res.json({
      success: true,
      message: "Recipe updated Successfully",
    });
  } catch (error) {
    console.error("Error Updating recipe", error);
    res.status(500).json({
      success: false,
      message: "Error Updating Server",
    });
  }
};

// ---------------------------deletedRecipe------------------------

export const deleteRecipe = async (req, res, next) => {
  const { id } = req.params;
  console.log("\n\n*********************");
  console.log(id);
  console.log("\n\n*********************");
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) return next(new ErrorHandler("Task not found", 404));

    await recipe.deleteOne();

    res.json({
      success: true,
      message: "Recipe removed successfully",
    });
  } catch (error) {
    console.log("Error deleting recipe", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
