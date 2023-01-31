import { SAVE_RECIPE_MEALS, SAVE_RECIPE_DRINKS } from '../actions';

export const INITIAL_STATE = {
  recipesMeals: [],
  recipesDrinks: [],
  recipeId: [],
};

const TWELVE = 12;

export const recipeReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_RECIPE_MEALS: if (Array.isArray(action.payload) && action.payload.length) {
    return {
      ...state,
      recipesMeals: [...action.payload.slice(0, TWELVE)],
    };
  }
    return state;

  case SAVE_RECIPE_DRINKS: if (Array.isArray(action.payload) && action.payload.length) {
    return {
      ...state,
      recipesDrinks: [...action.payload.slice(0, TWELVE)],
    };
  }
    return state;
  default: return state;
  }
};
