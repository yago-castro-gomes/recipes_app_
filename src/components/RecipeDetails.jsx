import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

export default function RecipeDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = history.location;

  const [dataApi, setDataApi] = useState([]);

  useEffect(() => {
    const fetchMealId = async () => {
      if (pathname === `/meals/${id}`) {
        try {
          const fetchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          const response = await fetchApi.json();
          const data = await response;
          setDataApi(data.meals);
          if (data.meals === null) {
            return global.alert(alertMenssage);
          }
          return data.meals;
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchMealId();
  }, [id, pathname]);

  useEffect(() => {
    const fetchDrinksId = async () => {
      if (pathname === `/drinks/${id}`) {
        try {
          const fetchApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
          const response = await fetchApi.json();
          const data = await response;
          setDataApi(data.drinks);
          if (data.meals === null) {
            return global.alert(alertMenssage);
          }
          return data.meals;
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchDrinksId();
  }, [id, pathname]);

  console.log(dataApi);

  if (pathname === `/meals/${id}` && dataApi.length !== 0) {
    return (
      <div>
        <img
          src={ dataApi[0].strMealThumb }
          alt={ dataApi[0].strMealThumb }
          data-testid="recipe-photo"
          width="30%"
        />
        <div data-testid="recipe-title">
          { dataApi[0].strMeal}
        </div>
        <div data-testid="recipe-category">
          {dataApi[0].strCategory}
        </div>
        <div>
          {}
        </div>
        ;
        <div data-testid="instructions">
          {' '}
          { dataApi[0].strInstructions }
        </div>
      </div>
    );
  }
}
