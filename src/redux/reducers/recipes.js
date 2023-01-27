import { SAVE_RECIPE_MEALS, SAVE_RECIPE_DRINKS } from '../actions';

export const INITIAL_STATE = {
  recipesMeals: [],
  recipesDrinks: [],
};
const DOZE = 12;
export const recipeReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_RECIPE_MEALS: return {
    state,
    recipesMeals: [...state.recipesMeals, ...action.payload.slice(0, DOZE)],
  };
  case SAVE_RECIPE_DRINKS: return {
    state,
    recipesDrinks: [...state.recipesDrinks, ...action.payload.slice(0, DOZE)],
  };
  default: return state;
  }
};
