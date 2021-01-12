import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView";

//polyfilling everyting else
import "core-js/stable";
//polyfilling async await
import "regenerator-runtime/runtime";
// console.log(icons);
// const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// console.log("Test");

// if (module.hot) {
//   module.hot.accept();
// }

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
    // console.log("Error from async controller: ", error);
    // recipeView.renderError(`${error.message}`);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // console.log(resultsView);
    //1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load search results
    await model.loadSearchResults(query);

    //3) Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPage(3));
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};
// controlSearchResults();
//Publisher - subscriber again

// controlRecipes();

//-----------------------Event handlers in MVC: Publisher-subscriber pattern
//The subscriber function must be passed as an argument for the publisher.
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();

// window.addEventListener("hashchange", controlRecipes);
//listening when the page is loading
// window.addEventListener("load", controlRecipes);

//------------------------receiving the recipe from API
//------------------------rendering the recipe
//------------------------- Listening for load and hashchange events
//-----------------------The MVC Architecture
//-----------------------Helpers and configuration files
//-----------------------Event handlers in MVC: Publisher-subscriber pattern
//-----------------------Implementing Errors and success messages
//-----------------------Implementing Search Results P1, P2
//-----------------------Implementing Pagination P1, P2
