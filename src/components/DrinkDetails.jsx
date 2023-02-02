import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import '../styles/details.css';
import { keyInProgress } from '../services/key';
import blackFavorite from '../images/blackHeartIcon.svg';

const SIX = 6;

export default function DrinkDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = history.location;
  const [dataApi, setDataApi] = useState([]);
  const [mealsRecom, setMealsRecom] = useState([]);
  const [buttonName, setButtonName] = useState('Start Recipe');
  const [ingMea, setIngMea] = useState([]);
  // const [favorite, setFavorite] = useState(blackFavorite);
  // const [toogle, setToogle] = useState(true);

  // useEffect(() => {
  //   setFavorite((state) => (toogle ? blackFavorite : whiteFavorite));
  // }, [toogle]);

  console.log(mealsRecom);

  const handleClick = () => {
    console.log('Clickou');
    history.push(`/drinks/${id}/in-progress`);
    const storedValue = localStorage.getItem('inProgressRecipes');
    const keyInProgressObject = storedValue ? JSON.parse(storedValue) : keyInProgress;
    const keyDinamic = id;
    if (!keyInProgressObject.drinks) {
      keyInProgressObject.drinks = {};
    }
    keyInProgressObject.drinks[keyDinamic] = { id };
    const newDrinks = { ...keyInProgressObject.drinks,
      [keyDinamic]: [ingMea] };
    const newKeyInProgress = { ...keyInProgressObject, drinks: newDrinks };
    const newKeyInProgressString = JSON.stringify(newKeyInProgress);
    localStorage.setItem('inProgressRecipes', newKeyInProgressString);
  };

  useEffect(() => {
    const storedValue = localStorage.getItem('inProgressRecipes');
    const keyInProgressObject = storedValue ? JSON.parse(storedValue) : keyInProgress;
    const keyDrinks = Object.keys(keyInProgressObject.drinks);
    const findKey = keyDrinks.find((key) => key === id);
    if (findKey) {
      setButtonName('Continue Recipe');
    }
  }, []);

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

  useEffect(() => {
    const fetchMealsRecom = async () => {
      try {
        const fetchApi = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const response = await fetchApi.json();
        const data = await response.meals;
        const dataSlice = data.slice(0, SIX);
        setMealsRecom(dataSlice);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMealsRecom();
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

  if (pathname === `/drinks/${id}` && dataApi.length !== 0) {
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
          { dataObject.strInstructions }
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
              src={ blackFavorite }
              alt="favorites"
            />
          </button>
        </div>
      </div>
    );
  }
}
