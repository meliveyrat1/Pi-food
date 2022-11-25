import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, getRecipes, removeDetail, removeRecipe} from "../../actions";
import { useEffect } from "react";
import "./RecipeDetails.css";

export default function Details(props) {
  console.log("PROPIEDADES", props);
  const dispatch = useDispatch();
  const history = useHistory()
  

  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
    
    //DESMONTA
    return () => {
      dispatch(removeDetail());
    };
  }, [dispatch, props.match.params.id]);

  const myRecipe = useSelector((state) => state.detail);
  // console.log("Recetaa", myRecipe)

   function deleteRecipe(){
    var answer = window.confirm("are you sure to delete this recipe?")
    if (answer === true)
    {
      dispatch(removeRecipe(props.match.params.id));
      dispatch(removeDetail());
      dispatch(getDetails());
      alert("deleted recipe")
      dispatch(getRecipes());
      history.push("/home");
      return true
    }else{
      return false;
    }
  } 

  return (//poner id?. hacer createdindb?
    <div style={{ overflow: "hidden" }}>
        
      {myRecipe.length === 0 ? (
        <div>
          <p id="not_found2">Loading...</p>
          <img
            alt="loading"
            src="https://playitaexpress.com/tempo/wp-content/uploads/2020/04/807de67f6_aa820_Thai_Noodles.gif"
            id="img"
          />
        </div>
      ) : (
        <div className="recipeContainer">
     
          <div className="recipeContainer2">
            <h1 className="title">{myRecipe[0].title}</h1>
            <img className="img"
              src={myRecipe[0].image}
            
              alt="img not found"
            />
           
            <h3 className="Preparation">Preparation time:</h3>
            <h2 className="Textito"> {myRecipe[0].readyInMinutes} minutes</h2>
            <h3 className="Preparation">Healthy Food Level: </h3>
            <h2 className="Textito">{myRecipe[0].healthScore}</h2>
            <h3 className="Preparation"> Like: </h3>
            <h2 className="Textito">{myRecipe[0].aggregateLikes}</h2>
            <h3 className="Preparation">Diets: </h3>
            <h2 className="Textito">{!myRecipe[0].createdInDb? myRecipe[0].diets + ' ' : myRecipe[0].diets + ' '}</h2>
            <h3 className="Preparation">Dish Type:</h3>
            <h2 className="Textito"> {myRecipe[0].dishTypes}</h2>
            <h3 className="Preparation">Origin Cuisine:</h3>
            <h2 className="Textito">{myRecipe[0].cuisines}</h2>
          </div>
          
          <div className="recipeDetail_text1">
           <button className="btnx" onClick={() => deleteRecipe()}>X</button> 
            <p id="Recipe">RECIPE</p>
            <p id="ingredients">Ingredients: </p>
            <p className="body">{myRecipe[0].ingredients}</p>
            <p id="title">Summary: </p>
            <p className="body">{myRecipe[0].summary}</p>
            <p id="title2">Instructions: </p>
            <p id="body2">{myRecipe[0].steps}</p>
          </div>
          
         
        <div>
         <Link to="/home">
            <button id="buttonReturn">RETURN</button>
          </Link> 
         
          </div>
      </div> 
          
      )}
    
    </div>
  );
}
