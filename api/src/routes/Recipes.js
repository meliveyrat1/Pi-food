const { Router } = require("express");
const router = Router();
const { getAllRecipes } = require("./../controllers/recipesControllers");




router.get("/", async (req, res) => {
  try {
    const name = req.query.name;
    let totalRecipes = await getAllRecipes();
    if (name) {
      let recipesByName = await totalRecipes.filter((e) =>
        e.title.toLowerCase().includes(name.toLowerCase())
      );

      recipesByName.length
        ? res.status(200).json(recipesByName)
        : res.status(400).json([]);
    } else {
      res.status(200).json(totalRecipes);
    }
  } catch (error) {
    res.status(400).send("Recipe not found");
  }
});


router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    let totalRecipes = await getAllRecipes();
    if (id) {
      let recipesById = await totalRecipes.filter((e) => e.id == id);
      recipesById.length
        ? res.status(200).json(recipesById)
        : res.status(404).send(`Ups...we dont have a recipe with ${id} as ID `);
    } else {
      res.status(400).send("Recipe not found");
      //console.log(recipesById);
    }
  } catch (error) {
       next(error)
  }
});

module.exports = router;
