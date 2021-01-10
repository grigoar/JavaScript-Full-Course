export const state = {
  recipe: {},
};

//this only change(manipulate) the state
export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      // "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc8f7"
    );

    //stop the execution until the promise is returned
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    console.log(res, data);

    // let recipe = data.data.recipe;
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log("My object received", state.recipe);
  } catch (error) {
    alert("Error from async model: ", error.message);
  }
};
