import 'regenerator-runtime/runtime';
import { getJSON } from './helpers.js';
import { API_URL, REC_PER_PAGE } from './config.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: '',
    recipePerPage: REC_PER_PAGE,
    curPage: 1,
  },
  bookMarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const { data } = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data;

    state.recipe = {
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      ingredient: recipe.ingredients,
      serving: recipe.servings,
      title: recipe.title,
      image: recipe.image_url,
      publisher: recipe.publisher,
      source: recipe.source_url,
    };
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  const res = await fetch(`${API_URL}?search=${query}`);
  const data = await res.json();
  state.search.results = data.data.recipes.map(rec => {
    return {
      id: rec.id,
      title: rec.title,
      image: rec.image_url,
      publisher: rec.publisher,
    };
  });
};

export const getRecipePage = function (page = state.search.curPage) {
  state.search.curPage = page;

  const start = (page - 1) * state.search.recipePerPage;
  const end = page * state.search.recipePerPage;

  return state.search.results.slice(start, end);
};

export const updateServingAndIng = function (updateTo) {
  state.recipe.ingredient.forEach(ing => {
    ing.quantity = ing.quantity * (updateTo / state.recipe.serving);
    // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4
  });
  state.recipe.serving = updateTo;
};

export const addBookmark = function (recipe) {
  state.bookMarks.push(recipe.id);
  if (state.recipe === recipe) state.recipe.isBookmarked = true;
};
