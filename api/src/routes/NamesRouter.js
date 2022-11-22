const { Router } = require("express");
const { NameRecipes } = require("../db");
const axios = require("axios");
const router = Router();
const { API_KEY} = process.env;

router.get("/", async (req, res) => {
  try {
    const info = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const types = info.data?.results.map((e) => e.title);

    console.log(types);

    types.forEach(e => {
        NameRecipes.findOrCreate({
            where: { title: e}
        })
    });

    const newDiets = await NameRecipes.findAll();
    res.status(200).json(newDiets);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;