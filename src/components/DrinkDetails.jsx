import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

export default function DrinkDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = history.location;

  const [dataApi, setDataApi] = useState([]);

  useEffect(() => {
    const fetchDrinksId = async () => {
      if (pathname === `/drinks/${id}`) {
        try {
          const fetchApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
          const response = await fetchApi.json();
          const data = await response;
          setDataApi(data.drinks);
          if (data.drinks === null) {
            return global.alert(alertMenssage);
          }
          return data.drinks;
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchDrinksId();
  }, [id, pathname]);

  if (pathname === `/drinks/${id}` && dataApi.length !== 0) {
    const dataObject = dataApi[0];
    const ingFilter = Object.keys(dataObject)
      .filter((cat) => cat.includes('strIng'));
    const machIngs = ingFilter.map((ing) => dataObject[ing]);
    const machResult = machIngs.filter((ing) => ing !== null);

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

    return (
      <div>
        <img
          src={ dataObject.strDrinkThumb }
          alt={ dataObject.strDrinkThumb }
          data-testid="recipe-photo"
          width="30%"
        />
        <div data-testid="recipe-title">
          { dataObject.strDrink}
        </div>
        <div data-testid="recipe-category">
          <div>{dataObject.strCategory}</div>
          <div>{ dataObject.strAlcoholic}</div>
        </div>
        <div data-testid="instructions">
          { dataObject.strInstructions }
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
      </div>
    );
  }
}
