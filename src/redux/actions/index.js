export const USER_LOGIN = 'USER_LOGIN';
export const SAVE_RECIPE_MEALS = 'SAVE_RECIPE';
export const SAVE_RECIPE_DRINKS = 'SAVE_RECIPE_DRINKS';
export const SAVE_RECIPE_ID = 'SAVE_RECIPE_ID';

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const saveRecipeMeals = (payload) => ({
  type: SAVE_RECIPE_MEALS,
  payload,
});

export const saveRecipeDrinks = (payload) => ({
  type: SAVE_RECIPE_DRINKS,
  payload,
});

export const saveRecipeId = (payload) => ({
  type: SAVE_RECIPE_ID,
  payload,
});
