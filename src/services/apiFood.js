const alertMenssage = 'Sorry, we haven\'t found any recipes for these filters.';

export const fetchIngredient = async (name) => {
  try {
    const fetchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
    const response = await fetchApi.json();
    const data = await response;
    if (data.meals === null) {
      return global.alert(alertMenssage);
    }
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};
export const fetchName = async (name) => {
  try {
    const fetchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const response = await fetchApi.json();
    const data = await response;
    if (data.meals === null) {
      return global.alert(alertMenssage);
    }
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLetter = async (name) => {
  try {
    const fetchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`);
    const response = await fetchApi.json();
    const data = await response;
    if (data.meals === null) {
      return global.alert(alertMenssage);
    }
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};
export const fetchDrinkIngredient = async (name) => {
  try {
    const fetchApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`);
    const response = await fetchApi.json();
    const data = await response;
    return data.drinks;
  } catch (error) {
    global.alert(alertMenssage);
  }
};
export const fetchDrinkName = async (name) => {
  try {
    const fetchApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const response = await fetchApi.json();
    const data = await response;
    if (data.drinks === null) {
      return global.alert(alertMenssage);
    }
    return data.drinks;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDrinkLetter = async (name) => {
  try {
    const fetchApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${name}`);
    const response = await fetchApi.json();
    const data = await response;
    if (data.drinks === null) {
      return global.alert(alertMenssage);
    }
    return data.drinks;
  } catch (error) {
    console.log(error);
  }
};