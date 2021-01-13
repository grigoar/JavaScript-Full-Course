// import * as config
import { API_URL, RES_PER_PAGE, KEY } from "./config.js";
import { AJAX } from "./helpers.js";
// import { getJSON, sendJSON } from "./helpers.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

// if (module.hot) {
//   module.hot.accept();
// }

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
    // key:recipe.key
  };
};

//this only change(manipulate) the state
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

    // let recipe = data.data.recipe;
    const { recipe } = data.data;
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some((bookmark) => bookmark.id === id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    console.log("My object received", state.recipe);
  } catch (error) {
    //receiving the propagated error
    console.log("Error from async model: ", error.message);
    //propagate the error for next module(controller)
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    console.log("all recipes for: ", data);

    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    //updating the page to 1 for each new search
    state.search.page = 1;
    // console.log(state.search.results);
  } catch (error) {
    console.log("Error from async model: ", error.message);
    //propagate the error for next module(controller)
    throw error;
  }
};

//get a part of the result (only 10 results)
export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; //0;
  const end = page * state.search.resultsPerPage; //9;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQuantity = oldQT * newServings /oldServings// 2 * 8 /4 = 4
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
  console.log("recipe bookmarked persisted");
};

export const addBookmark = function (recipe) {
  //Add bookmark
  state.bookmarks.push(recipe);

  //Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  console.log(`Bookmark with ${id} to delete`);
  // Delete bookmark
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  // console.log(localStorage.getItem("bookmarks"));
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
console.log(state.bookmarks);

const clearBookmarks = function () {
  localStorage.clear("bookmarks");
};
// clearBookmarks();

//make a request for the API and need an async function
export const uploadRecipe = async function (newRecipe) {
  try {
    //converting to an array vs. converting to an object from an array(entries vs fromEntries)
    console.log(Object.entries(newRecipe));
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith(`ingredient`) && entry[1] !== "")
      .map((ing) => {
        const ingArr = ing[1].split(",").map((el) => el.trim());
        // const ingArr = ing[1].replaceAll(" ", "").split(",");
        if (ingArr.length !== 3)
          throw new Error("Wrong ingredient format! Please use the correct format!");

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    console.log(ingredients);

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    // console.log(recipe);
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    // console.log(data);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};
