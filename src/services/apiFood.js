export const fetchIngredient = async (name) => {
  const fetchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
  const response = await fetchApi.json();
  const data = await response;
  return data.meals;
};
export const fetchName = async (name) => {
  const fetchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const response = await fetchApi.json();
  const data = await response;
  return data;
};

export const fetchLetter = async (name) => {
  const fetchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`);
  const response = await fetchApi.json();
  const data = await response;
  return data;
};
