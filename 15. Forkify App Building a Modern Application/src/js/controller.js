import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

//polyfilling everyting else
import "core-js/stable";
//polyfilling async await
import "regenerator-runtime/runtime";
// console.log(icons);
const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// console.log("Test");

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    //clause guard if there is not a recipe id
    if (!id) return;
    recipeView.renderSpinner();

    //1)Loading recipe
    //a async function calling another async function
    //This would receive a promise, so we need to wait
    await model.loadRecipe(id); //this not storing anything, we need the state

    // const  recipe  = model.state.recipe;
    // const { recipe } = model.state;

    //2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert("Error from async controller: ", error);
  }
};

// controlRecipes();
["hashchange", "load"].forEach((ev) => window.addEventListener(ev, controlRecipes));
// window.addEventListener("hashchange", controlRecipes);
//listening when the page is loading
// window.addEventListener("load", controlRecipes);

//------------------------receiving the recipe from API
//------------------------rendering the recipe
//------------------------- Listening for load and hashchange events
//-----------------------The MVC Architecture
