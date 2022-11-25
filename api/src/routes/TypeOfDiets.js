const { Router } = require("express");
const { Diet } = require("../db");
const axios = require("axios");
const router = Router();
const { API_KEY } = process.env;

router.get("/", async (req, res,next) => {
  try {
    const info = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const types = info.data?.results.map((e) => e.diets);
    const newTypes = types.flat().concat("vegetarian", "ketogenic");
    const finalTypes = [...new Set(newTypes)];

    console.log("SOY NEW TYPESSSS", newTypes);
    // console.log(dishTypes);
    for (let element in finalTypes) {
      Diet.findOrCreate({
        where: { title: finalTypes[element] },
      });
    }

    const newDiets = await Diet.findAll();
    res.status(200).json(newDiets);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
