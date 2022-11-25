import { useState, useEffect } from "react";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getDiets } from "../../actions";
import "./CreateRecipe.css";

//---------- VALIDACIONES -----------

function validate(input) {
  let errors = {};

  if (!/^[a-zA-Z\s]*$/.test(input.title))
    errors.title = "Invalid name, must only contain letters";
  if (!input.title) {
    errors.title = "Name is required";
  }
  if (!input.summary) {
    errors.summary = "Summary is required";
  }

  if (input.healthScore < 0 || input.healthScore > 100) {
    errors.healthScore = "Please, insert a number from 1 to 100";
  }
  if (input.readyInMinutes < 0 || input.readyInMinutes > 100) {
    errors.readyInMinutes = "Please, insert a number from 1 to 100";
  }
 if(input.diets === 0){
  errors.diets = 'Chosse a diet'
 }
 if (!input.steps) {
  errors.steps = "Steps is required";
}
if (!input.cuisines) {
  errors.cuisines = "Origin cuisine is required"
}
 if (!input.ingredients) {
  errors.ingredients = "Ingredients is required"
} 
  return errors;
}

//-------------------------------------

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets); 

  //CREO ESTADOS LOCALES PARA ALMACENAR INFORMACION
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    title: "",
    image: "", 
    summary: "",
    healthScore: "",
    cuisines: "" ,
    steps: [],
    diets: [],
    ingredients: "",
    readyInMinutes: "",
  });

  //--- HANDLERS
  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheckBox(e) {
    const clicked = diets
      .filter((d) => e.target.value === d.title)
      .map((d) => d.title);
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, ...clicked],
      });
    } else {
      setInput({
        ...input,
        diets: input.diets.filter((e) => e !== clicked[0]),
      });
    }
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectStep(e) {
    setInput({
      ...input,
      steps: [e.target.value],
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectCuisines(e) {
    setInput({
      ...input,
      cuisines: [e.target.value],
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleSelectIngredients(e) {
    setInput({
      ...input,
      ingredients: [e.target.value],
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }




  function handleSubmit(e) {
    e.preventDefault();
    // console.log("RECETA EN CREACION", input);
    dispatch(postRecipe(input));
    alert("Recipe created successfully!");
    //reseteo para que quede vacio
    setInput({
      title: "",
      image: "",  
      summary: "",
      healthScore: "",
      cuisines: "",
      steps: [],
      diets: [],
      ingredients: "",
      readyInMinutes: "",
    });
    history.push("/home");
  }

  //EJECUTO LA ACCION CUANDO SE MONTA EL COMPONENTE
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  //renderizado
  return (
    <div className="fondo">
       <h1 className="title">Create a new Recipe</h1>
      <div className="formContainer">
       
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="inputs">
            <div className="text">
              <label>Name: </label>
              <input
               className="placeholder1"
                type="string"
                value={input.title}
                name="title"
                onChange={(e) => handleInputChange(e)}
              />
              {errors.title && <h5 className="error">{errors.title}</h5>}
            </div>
            <div className="text">
              <label>Image: </label>
              <input
                type="url"
                value={input.image}
                name="image"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
             
            <div className="text">
              <label>Healthy Food Level: </label>
              <input
                type="number"
                value={input.healthScore}
                name="healthScore"
                onChange={(e) => handleInputChange(e)}
              />
              {errors.healthScore && <h5 className="error">{errors.healthScore}</h5>}
            </div>
            <div className="text">
              <label>Preparation Time: </label>
              <input
                type="number"
                value={input.readyInMinutes}
                name="readyInMinutes"
                onChange={(e) => handleInputChange(e)}
              />
              {errors.readyInMinutes && <h5 className="error">{errors.readyInMinutes}</h5>}
            </div>
             <div className="text">
              <label>Ingredients: </label>
              <input
                className="textarea"
                type="text"
                value={input.ingredients}
                name="ingredients"
                onChange={(e) => handleSelectIngredients(e)}
              />
              {errors.ingredients && <h5 className="error">{errors.ingredients}</h5>}
            </div> 
       
            <div className="text">
              <label>Summary: </label>
              <input
                className="textarea"
                type="text"
                value={input.summary}
                name="summary"
                onChange={(e) => handleInputChange(e)}
              />
              {errors.summary && <h5 className="error">{errors.summary}</h5>}
            </div>
            <div className="text">
              <label>Origin Cuisine: </label>
              <input
              
                id="cuisines"
                type="text"
                value={input.cuisines}
                name="cuisines"
                onChange={(e) => handleSelectCuisines(e)}
              />
               {errors.cuisines && <h5 className="error">{errors.cuisines}</h5>}
            </div>

            <div className="text">
              <label>Steps: </label>
              <input
                className="textarea"
                id="steps"
                type="text"
                value={input.steps}
                name="steps"
                onChange={(e) => handleSelectStep(e)}
              />
               {errors.steps && <h5 className="error">{errors.steps}</h5>}
            </div>
            
       
            
          </div>
          <div className="tipoDeDietas">
            <div>
              <label>Diets:</label>
              <div className="opciones">
                {diets.map((e) => (
                  <div className="box">
                    <input
                      className="box2"
                      type="checkbox"
                      value={e.title}
                      name={e.title}
                      onChange={(e) => handleCheckBox(e)}
                    />
                    {errors.diets && <h5 className="error">{errors.diets}</h5>}
                    <h3>{e.title}</h3>
                    
                  </div>
                  
                ))}
              </div>
            </div>
          </div>
          {errors.title ||
            errors.summary ||
            errors.steps ||
            errors.cuisines ||
            errors.healthScore ||
            errors.readyInMinutes ||
            errors.ingredients ||
            errors.diets ||
            input.title === "" ? (
            <button className="createButton2" select disabled type="submit">
              Create Recipe
            </button>
          ) : (
            <button className="createButton" type="submit">
              Create Recipe
            </button>
          )}
        </form>
        <div className="Containerbutton">
          <div >
            <Link to="/home">
            <button className="returnButton">RETURN</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
