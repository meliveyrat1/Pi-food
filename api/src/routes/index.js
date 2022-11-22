const { Router } = require("express");
// Importar todos los routers;
const recipesRoute = require("./Recipes");
const typeOfDietsRoute = require("./TypeOfDiets");
const postRecipeRoute = require("./PostRecipe");
const namesRouter = require('./namesRouter');
const router = Router();

// Configurar los routers
router.use("/recipe", postRecipeRoute);
router.use("/recipes", recipesRoute);
router.use("/types", typeOfDietsRoute);
router.use('/names', namesRouter); 

module.exports = router;
