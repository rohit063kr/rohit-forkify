import 'regenerator-runtime/runtime';
import 'core-js/stable';

import * as model from './model.js';

import recipeView from './views/recipeView';
import searchView from './views/searchView.js';
import searchResultView from './views/searchResultView.js';
import paginationView from './views/paginationView.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const controleRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Rendering loading spinner
    recipeView.renderLoadingSpinner();

    // loading recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controleSearchRecipe = async function () {
  try {
    // Getting query
    const query = searchView.getQuery();

    if (!query) return;
    // waiting for results
    searchResultView.renderLoadingSpinner();

    // Loading results
    await model.loadSearchResults(query);
    model.getRecipePage(1);
    searchResultView.render(model.getRecipePage());

    paginationView.render(model.state.search);
  } catch (err) {
    searchResultView.renderError();
  }
};

const controlePagination = function (goTo) {
  searchResultView.render(model.getRecipePage(goTo));
  paginationView.render(model.state.search);
};

const controleServing = function (updateTo) {
  model.updateServingAndIng(updateTo);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controleRecipe);
  recipeView.addHandlerUpdateServing(controleServing);
  searchView.addHandlerSearch(controleSearchRecipe);
  paginationView.addHandlerClick(controlePagination);
  console.log('test');
};
init();
