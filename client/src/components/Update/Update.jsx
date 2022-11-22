/* import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import {getDiets, getRecipes, UpdateRecipe, removeDetail, getDetails} from '../../actions/index'
import {useDispatch, useSelector} from 'react-redux';

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
     if (!input.ingredients) {
      errors.ingredients = "Ingredients is required";
    }
    if (!input.readyInMinutes) {
      errors.readyInMinutes = "Is necessary add a preparation time";
    }   
    if (input.spoonacularScore < 0 || input.spoonacularScore > 100) {
      errors.spoonacularScore = "Please, insert a number from 1 to 100";
    }
    if (input.healthScore < 0 || input.healthScore > 100) {
      errors.healthScore = "Please, insert a number from 1 to 100";
    }
    if (!input.steps.length){
      errors.steps = "Steps is required";
  }
    return errors;
  }
  
  //-------------------------------------
  
  export default function RecipeUpdate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector((state) => state.diets); //me traigo el estado de las dietas con el useSelector
    //const allRecipes = useSelector((state) => state.recipes);
    const details= useSelector(state => state.detail)
    const { id } = useParams(); 

    //CREO ESTADOS LOCALES PARA ALMACENAR INFORMACION
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
      title: "",
      image: "",
       ingredients: "",
      readyInMinutes: "",  
      summary: "",
      spoonacularScore: "",
      healthScore: "", 
      steps: [],
      diets: [],
      id:id
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
    }
  
    function handleSelectStep(e) {
      setInput({
        ...input,
        steps: [e.target.value],
      });
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      // console.log("RECETA EN CREACION", input);
      dispatch(UpdateRecipe(input, id));
      dispatch(removeDetail())
      dispatch(getRecipes())
      dispatch(getDetails())
      alert("Recipe created successfully!");
      //reseteo para que quede vacio
      setInput({
        title: "",
        image: "",
         ingredients: [],
        readyInMinutes: "", 
        summary: "",
        spoonacularScore: "",
        healthScore: "",
        steps: [],
        diets: [],
      });
      history.push("/home");
    }
  
    //EJECUTO LA ACCION CUANDO SE MONTA EL COMPONENTE
    useEffect(() => {
      dispatch(getDiets());
      dispatch(getDetails(id))
    }, [dispatch]);
  
    //renderizado
    return (
      <div className="fondo">
        <div className="formContainer">
          <h1 className='title'>Update Recipe {details.title}</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="inputs">
              <div className="text">
                <label>Name: </label>
                <input
                  type="string"
                  placeholder="name..."
                  value={input.title}
                  name="title"
                  onChange={(e) => handleInputChange(e)}
                />
                {errors.title && <h5>{errors.title}</h5>}
              </div>
              <div className="text">
                <label>Image: </label>
                <input
                  type="url"
                  placeholder="Url..."
                  value={input.image}
                  name="image"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
                 <div className="text">
                <label>Preparation Time: </label>
                <input
                  type="number"
                  placeholder="minutes..."
                  value={input.readyInMinutes}
                  name="readyInMinutes"
                  onChange={(e) => handleInputChange(e)}
                />
                {errors.readyInMinutes && <h5>{errors.readyInMinutes}</h5>}
              </div>  
              <div className="text">
                <label>Score: </label>
                <input
                  type="number"
                  placeholder="score..."
                  value={input.spoonacularScore}
                  name="spoonacularScore"
                  onChange={(e) => handleInputChange(e)}
                />
                {errors.spoonacularScore && <h5>{errors.spoonacularScore}</h5>}
              </div>
              <div className="text">
                <label>Healthy Food Level: </label>
                <input
                  type="number"
                  placeholder="healthscore..."
                  value={input.healthScore}
                  name="healthScore"
                  onChange={(e) => handleInputChange(e)}
                />
                {errors.healthScore && <h5>{errors.healthScore}</h5>}
              </div>
                  <div className="text">
                <label>Ingredients: </label>
                <input
                  type="text"
                  placeholder="ingredients..."
                  value={input.ingredients}
                  name="ingredients"
                  onChange={(e) => handleInputChange(e)}
                />
                {errors.ingredients && <h5>{errors.ingredients}</h5>}
              </div>  
              <div className="text">
                <label>Summary: </label>
                <input
                  className="textarea"
                  placeholder="summary..."
                  type="text"
                  value={input.summary}
                  name="summary"
                  onChange={(e) => handleInputChange(e)}
                />
                {errors.summary && <h5>{errors.summary}</h5>}
              </div>
  
              <div className="text">
                <label>Steps: </label>
                <input
                  className="textarea"
                  placeholder="steps..."
                  type="text"
                  value={input.steps}
                  name="steps"
                  onChange={(e) => handleSelectStep(e)}
                  id="steps"
                />
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
                      <h3>{e.title}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {errors.title ||
              errors.summary ||
              errors.spoonacularScore ||
              errors.healthScore ||
              input.title === "" ? (
              <button className="createButton2"  type="submit" disabled={true}>
                Update Recipe
              </button>
            ) : (
              <button className="createButton" type="submit">
                Update Recipe
              </button>
            )}
          </form>
          <div className="Containerbutton">
            <div className="returnButton">
              <Link to="/home">
              <button className="btnReturn">RETURN HOME</button>
              </Link>
            </div>
            <div className="returnButton">
              <Link to={"/recipes/" +id}>
              <button className="btnReturn">RETURN TO DETAIL</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
   */