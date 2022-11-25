const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const getApiInfo = async () => {
  try {
    const apiUrl = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const apiData = apiUrl.data?.results.map((e) => {
      return {
        title: e.title,
        id: e.id,
        summary: e.summary,
        cuisines: e.cuisines,
        steps: e.analyzedInstructions[0]?.steps.map((e) => e.step),
        healthScore: e.healthScore,
        diets: e.diets,
        image: e.image,
        dishTypes: e.dishTypes,
        ingredients: e.analyzedInstructions[0]?.steps.map((e) =>
          e.ingredients.map((el) => el.name)
        ),
        aggregateLikes: e.aggregateLikes,
        readyInMinutes: e.readyInMinutes,
      };
    });
    return apiData;
  } catch (error) {
    console.log(error);
  }
};

const getDbInfo = async () => {
  try {
    let dbRecipes = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["title"],
        through: {
          attributes: [],
        },
      },
    });
  
    return dbRecipes.map((e) => {
      return {
        title: e.title,
        id: e.id,
        summary: e.summary,
        steps: e.steps,
        spoonacularScore: e.spoonacularScore,
        healthScore: e.healthScore,
        diets: e.diets.map((e) => e.title),
        image: e.image,
        cuisines: e.cuisines,
        ingredients: e.ingredients,
        readyInMinutes: e.readyInMinutes,
        createdInDb: e.createdInDb,
      };
    });
  } catch (error) {
    console.log(error)
  }
  
};

const getAllRecipes = async () => {
  try {
    const apiData = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiData.concat(dbInfo);
    return infoTotal;
  } catch (error) {
    console.log(error)
  }
 
};

module.exports = {
  getAllRecipes,
  getApiInfo,
};
