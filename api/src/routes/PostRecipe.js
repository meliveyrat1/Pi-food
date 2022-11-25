const { Router } = require("express");
const { Diet, Recipe, DishType, NameRecipes } = require("../db");
const router = Router();
const checkData = require('../middlewares/chekData')

router.post("/", checkData, async (req, res, next) => {
  try {
    let {
      title,
      summary,
      cuisines,
      healthScore,
      steps,
      diets,
      image,
      ingredients,
      readyInMinutes,
    } = req.body;

    let recipeCreated = await Recipe.create({
      title,
      summary,
      cuisines,
      ingredients,
      readyInMinutes,
      healthScore,
      steps,
      image,
    });
    //console.log("DIETSS", diets);

    diets.forEach(async (e) => {
      let dietDb = await Diet.findAll({
        where: { title: e },
      });
      await recipeCreated.addDiet(dietDb);
      //console.log("acaaaaa", dietDb);
    });
  
    
    res.status(200).send("Recipe created successfully");
  } catch (error) {
       next(error)
  }
});

router.put('/:id', async(req, res, next)=>{
  const{id} = req.params;
  try {
      const {title, summary, steps, healthScore, cuisines }= req.body;
      await Recipe.update({title, summary, steps, healthScore,cuisines,id}, {
          where: {
              id: id
            },
      });
      return res.json({cambiado: true})
  } catch (error) {
      next(error)
  }
  

})

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
      await Recipe.destroy({
          where: {
              id: id
          }
      });
      return res.json({borrado: true})    
  } catch (error) {
      next(error);
  }
  
});  

module.exports = router;















  /*   dishTypes.forEach(async (e) => {
      let dishTypeDb = await DishType.findAll({
        where: { title: e }
      });
      await recipeCreated.addDishTypes(dishTypeDb);
      //console.log("acaaaaa", dietDb);
    });    */