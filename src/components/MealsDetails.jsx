import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchDrinkRecom } from '../services/apiFood';
import '../styles/details.css';
import favoritesImg from '../images/whiteHeartIcon.svg';
import { keyInProgress } from '../services/key';

const THIRTYTWO = 32;

export default function MealsDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = history.location;

  const [dataApi, setDataApi] = useState([]);
  const [drinkRecom, setDrinkRecom] = useState([]);
  const [buttonName, setButtonName] = useState('Start Recipe');
  const [ingMea, setIngMea] = useState([]);

  console.log(drinkRecom);
  const handleClick = () => {
    console.log('Clickou');
    history.push(`/meals/${id}/in-progress`);
    const storedValue = localStorage.getItem('inProgressRecipes');
    const keyInProgressObject = storedValue ? JSON.parse(storedValue) : keyInProgress;
    const keyDinamic = id;
    if (!keyInProgressObject.meals) {
      keyInProgressObject.meals = {};
    }
    keyInProgressObject.meals[keyDinamic] = { id };
    const newMeals = { ...keyInProgressObject.meals,
      [keyDinamic]: [ingMea] };
    const newKeyInProgress = { ...keyInProgressObject, meals: newMeals };
    const newKeyInProgressString = JSON.stringify(newKeyInProgress);
    localStorage.setItem('inProgressRecipes', newKeyInProgressString);
  };

  useEffect(() => {
    const storedValue = localStorage.getItem('inProgressRecipes');
    const keyInProgressObject = storedValue ? JSON.parse(storedValue) : keyInProgress;
    const keyDrinks = Object.keys(keyInProgressObject.meals);
    const findKey = keyDrinks.find((key) => key === id);
    if (findKey) {
      setButtonName('Continue Recipe');
    }
  }, []);

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
    const drinkRecomFetch = async () => {
      setDrinkRecom(await fetchDrinkRecom());
    };
    drinkRecomFetch();
  }, []);

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

        setIngMea(ingAndMeaArray);
      }
    };
    setArrayMealsAndIng();
  }, [dataApi, dataObject]);

  if (pathname === `/meals/${id}` && dataApi.length !== 0) {
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
          {dataObject.strMeal}
        </div>
        <div data-testid="recipe-category">
          {dataObject.strCategory}
        </div>
        <div>
          { }
        </div>
        <div>
          {
            ingMea.map((ing, i) => (
              <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                {Object.keys(ing)}
                -
                {Object.values(ing)}
              </li>
            ))
          }
        </div>
        <div data-testid="instructions">
          {dataObject.strInstructions}
        </div>
        <div>
          {dataObject.strYoutube !== '' ? (
            <iframe
              title={ dataObject.strMeal }
              width="400"
              height="220"
              src={ `https://www.youtube.com/embed/${stringYtt}` }
              data-testid="video"
            />
          ) : ''}
        </div>
        <div>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="btn-start"
            onClick={ handleClick }
          >
            { buttonName }
          </button>
        </div>
        <div>
          <button
            type="button"
            data-testid="share-btn"
          >
            Share
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            <img
              src={ favoritesImg }
              alt="favorites"
            />
          </button>
        </div>
      </div>
    );
  }
}
