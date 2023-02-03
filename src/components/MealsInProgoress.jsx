import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import shareButton from '../images/shareIcon.svg';
import favoritesImg from '../images/whiteHeartIcon.svg';

export default function MealsInProgoress() {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = history.location;
  const [dataApi, setDataApi] = useState([]);
  const [ingMea, setIngMea] = useState([]);

  useEffect(() => {
    const fetchMealId = async () => {
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
    };
    fetchMealId();
  }, [id, pathname]);

  const dataObject = dataApi[0];

  useEffect(() => {
    const setArrayMealsAndIng = () => {
      if (dataApi.length !== 0) {
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
        ingAndMeaArray.pop();
        const checkedAndMeaIng = ingAndMeaArray
          .map((check) => ({ ...check, isChecked: false }));
        setIngMea(checkedAndMeaIng);
      }
    };
    setArrayMealsAndIng();
  }, [dataApi, dataObject]);

  const handdleTrough = (i) => {
    const updateCheck = [...ingMea];
    updateCheck[i].isChecked = !updateCheck[i].isChecked;
    setIngMea(updateCheck);
  };

  console.log(dataApi[0]);
  if (pathname === `/meals/${id}/in-progress` && dataApi.length !== 0) {
    const checkEvery = ingMea.every((check) => check.isChecked === true);
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ dataObject.strMealThumb }
          alt={ dataObject.strMealThumb }
          width="30%"
        />
        <div data-testid="recipe-title">{ dataObject.strMeal }</div>
        <div>
          <button
            type="button"
            data-testid="share-btn"
          >
            <img
              src={ shareButton }
              alt="share"
            />
          </button>
          <button
            type="button"
          >
            <img
              data-testid="favorite-btn"
              src={ favoritesImg }
              alt="favorites"
            />
          </button>
        </div>
        <div data-testid="recipe-category">
          { dataObject.strCategory }
        </div>
        <div data-testid="instructions">{ dataObject.strInstructions }</div>
        <div>
          {
            ingMea.map((ing, i) => (
              <label
                htmlFor={ i }
                data-testid={ `${i}-ingredient-step` }
                key={ i }
                style={ { textDecoration: ing.isChecked
                  ? 'line-through solid rgb(0, 0, 0)' : 'none' } }
              >
                {Object.keys(ing)[0]}
                -
                {Object.values(ing)[0]}
                <input type="checkbox" name={ i } onChange={ () => handdleTrough(i) } />
              </label>
            ))
          }
        </div>
        <button
          data-testid="finish-recipe-btn"
          disabled={ !checkEvery }
        >
          Finish
        </button>
      </div>
    );
  }
}
