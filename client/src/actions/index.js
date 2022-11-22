import axios from "axios";


export function getRecipes() {
	return (dispatch) => {
		axios.get("http://localhost:3001/recipes")
		.then((response) => {
			dispatch({ type: "GET_RECIPES", payload: response.data });
		}).catch(()=> alert("Recipe not found"))
	}
}  

export function getRecipesByName(name) {
	return (dispatch) => {
		axios.get("http://localhost:3001/recipes?name=" + name)
		.then((response) => {
			dispatch({ type: "GET_RECIPES_BY_NAME", payload: response.data });
		}).catch(()=> alert("Recipe not found"))
	};
}
export function getDiets() {
	return (dispatch) => {
		axios.get("http://localhost:3001/types")
		.then((response) => {
			dispatch({ type: "GET_DIETS", payload: response.data });
		}).catch(()=> alert("Diet not found"))
	};
}  


 export function postRecipe(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.post("http://localhost:3001/recipe", payload);
      return json;
    } catch (error) {
      console.log(error)
    }
  };
} 


export function filterRecipesbyDiets(payload) {
  return {
    type: "FILTER_BY_DIETS",
    payload,
  };
}
export function filterRecipesbyDishTypes(payload) {
  return {
    type: "FILTER_BY_DISHTYPES",
    payload,
  };
}
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByScore(payload) {
  return {
    type: "ORDER_BY_SCORE",
    payload,
  };
}
export function orderByLike(payload) {
  return {
    type: "ORDER_BY_LIKE",
    payload,
  };
}

export function getDetails(id) {
	return (dispatch) => {
		axios.get("http://localhost:3001/recipes/" + id)
		.then((response) => {
			dispatch({ type: "GET_DETAILS", payload: response.data });
		}).catch(()=> alert(`Ups...we dont have a recipe with ${id} as ID `))
	};
}

export function getNamesRecipes() {
	return (dispatch) => {
		axios.get("http://localhost:3001/names")
		.then((response) => {
			dispatch({ type: "GET_NAMES_RECIPES", payload: response.data });
		});
    
	};
}  

export function filterRecipesbyNames(payload) {
  return {
    type: "FILTER_BY_NAMES",
    payload,
  };
}

export function removeDetail() {
  return {
    type: "REMOVE_DETAILS",
  };
}

 export function filterCreated(payload) {
  return {
      type: "FILTER_CREATED",
      payload
  }
} 

 export function removeRecipe (id) {
  return async function(dispatch){
    try {
      const response = await axios.delete("http://localhost:3001/recipe" + id)
      console.log(response)
      return dispatch({
				type: "REMOVE_RECIPE",
				payload: response.data
			})	
    } catch (error) {
      alert("DELETE ERROR")
    }
 } 
} 












/* export function UpdateRecipe(payload, id){
	return async function (dispatch) {
    try {
      var json = await axios.put("http://localhost:3001/recipe" + payload.id, payload);
			return dispatch({
				type: "UPDATE_RECIPE",
				payload: json.data
			})	
    } catch (error) {
      alert("UPDATE ERROR")
    }
  }
} */


/* export function removeRecipe() {
  return {
    type: "REMOVE_RECIPE",
  };
} */
/* export function removeRecipe (id) {
  return async function(dispatch){
    try {
      const response = await axios.delete("http://localhost:3001/recipe" + id)
      console.log(response)
      return dispatch({
				type: "REMOVE_RECIPE",
				payload: response.data
			})	
    } catch (error) {
      alert("DELETE ERROR")
    }
 } 
} */
