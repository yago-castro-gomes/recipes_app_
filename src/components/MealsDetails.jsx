import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const THIRTYTWO = 32;

export default function MealsDetails() {
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

  if (pathname === `/meals/${id}` && dataApi.length !== 0) {
    const dataObject = dataApi[0];
    const ingFilter = Object.keys(dataObject)
      .filter((cat) => cat.includes('strIng'));
    const machIngs = ingFilter.map((ing) => dataObject[ing]);
    const machResult = machIngs.filter((ing) => ing !== '');

    const measureFilter = Object.keys(dataObject)
      .filter((cat) => cat.includes('strMeasu'));
    const machMeasure = measureFilter.map((mea) => dataObject[mea]);
    const machResultMea = machMeasure.filter((mea) => mea !== ' ');

    const ingAndMea = [];
    for (let i = 0; i < machResult.length; i += 1) {
      ingAndMea[machResult[i]] = machResultMea[i];
    }
    const ingAndMeaArray = Object.entries(ingAndMea)
      .map(([key, value]) => ({ [key]: value }));

    console.log(dataObject);

    const stringYtt = dataObject.strYoutube.slice(THIRTYTWO);

    return (
      <div>
        <img
          src={ dataObject.strMealThumb }
          alt={ dataObject.strMealThumb }
          data-testid="recipe-photo"
          width="30%"
        />
        <div data-testid="recipe-title">
          { dataObject.strMeal}
        </div>
        <div data-testid="recipe-category">
          {dataObject.strCategory}
        </div>
        <div>
          {}
        </div>
        <div>
          {
            ingAndMeaArray.map((ing, i) => (
              <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                {Object.keys(ing)}
                -
                {Object.values(ing)}
              </li>
            ))
          }
        </div>
        <div data-testid="instructions">
          { dataObject.strInstructions }
        </div>
        { dataObject.strYoutube !== '' ? (
          <iframe
            title={ dataObject.strMeal }
            width="400"
            height="220"
            src={ `https://www.youtube.com/embed/${stringYtt}` }
            data-testid="video"
          />
        ) : ''}
      </div>
    );
  }
}
