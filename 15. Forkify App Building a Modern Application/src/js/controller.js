import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import bookmarksView from "./views/bookmarksView";
import addRecipeView from "./views/addRecipeView";
import { MODAL_CLOSE_SEC } from "./config.js";

//polyfilling everyting else
import "core-js/stable";
//polyfilling async await
import "regenerator-runtime/runtime";
import View from "./views/View.js";
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

    //0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultPage());

    // resultsView.render(model.getSearchResultPage());
    //0.5) Updating bookmarks view
    // debugger;
    bookmarksView.update(model.state.bookmarks);

    //1)Loading recipe
    //a async function calling another async function
    //This would receive a promise, so we need to wait
    await model.loadRecipe(id); //this not storing anything, we need the state

    // const  recipe  = model.state.recipe;
    // const { recipe } = model.state;

    //2) Rendering recipe
    recipeView.render(model.state.recipe);
    console.log(model.state.recipe);

    //TEST
    // controlServings();
  } catch (error) {
    // console.log("Error from async controller: ", error);
    // recipeView.renderError(`${error.message}`);
    recipeView.renderError();
    console.error(error);
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
    resultsView.render(model.getSearchResultPage());

    //4) Render initial pagination buttons
    paginationView.render(model.state.search);
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};
// controlSearchResults();
//Publisher - subscriber again

// controlRecipes();

const controlPagination = function (gotToPage) {
  //1) Render new results
  resultsView.render(model.getSearchResultPage(gotToPage));

  //2) Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  // just update the data, not render
  recipeView.update(model.state.recipe);

  // Update the recipe view
};

const controlAddBookMark = function () {
  //1) Add/remove bookmark
  console.log(model.state.recipe.bookmarked);
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //2)Update recipe view
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  //3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  // console.log(newRecipe);
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    //Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    //Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //Change ID in URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    // window.history.back();

    //Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.error("My error!", error);
    addRecipeView.renderError(error.message);
  }
};

//-----------------------Event handlers in MVC: Publisher-subscriber pattern
//The subscriber function must be passed as an argument for the publisher.
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookMark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  // controlServings();
};
init();

// window.addEventListener("hashchange", controlRecipes);
//listening when the page is loading
// window.addEventListener("load", controlRecipes);

//-----------------------Future ideas challenges:
//-Dispaly number of pages between the pagination buttons;
//-Ability to sort search results by duration or number of ingredients;
//-Perform ingredient validation in view, before submitting the form;
//-Improve recipe ingredient input: separate in multiple fields and allow more than 6 ingredients;
//--Shopping list features: button on recipe to add ingredients to a list;
//--Weekly meal planning feature: assign recipes to the next 7 days and show on a weekly calendar;
//--Get nutrition data on each ingredient from spoonacular API(https://spoonacular.com/food-api) and calculate total calories of recipe.

//-----------------------Project Planning I
//-----------------------Receiving the recipe from API
//-----------------------Rendering the recipe
//-----------------------Listening for load and hashchange events
//-----------------------The MVC Architecture

//-----------------------Helpers and configuration files
//-----------------------Event handlers in MVC: Publisher-subscriber pattern
//-----------------------Implementing Errors and success messages
//-----------------------Implementing Search Results P1, P2
//-----------------------Implementing Pagination P1, P2

//-----------------------Project Planning II
//-----------------------Update Recipe Servings
//-----------------------Developing a DOM updating Algorithm
//-----------------------Implementing Bookmarks P1, P2

//-----------------------Storing Bookmarks with localStorage(persistance)
//-----------------------Project Planning III
//-----------------------Uploading a new recipe P1, P2, P3
//-----------------------Writing documentation and tips
