import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import Carousel from 'react-elastic-carousel';
import '../styles/details.css';
import { keyInProgress } from '../services/key';
import favoritesImg from '../images/whiteHeartIcon.svg';
import blackFavorite from '../images/blackHeartIcon.svg';
import shareButton from '../images/shareIcon.svg';

const SIX = 6;
const copy = require('clipboard-copy');

export default function DrinkDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = history.location;
  const [dataApi, setDataApi] = useState([]);
  const [mealsRecom, setMealsRecom] = useState([]);
  const [buttonName, setButtonName] = useState('Start Recipe');
  const [ingMea, setIngMea] = useState([]);
  const [isCopy, setIsCopy] = useState(false);
  const [favorite, setFavorites] = useState([]);
  const [favoriteImage, setFavoriteImage] = useState(favoritesImg);
  console.log(mealsRecom);

  const handleClick = () => {
    console.log('Clickou');
    history.push(`/drinks/${id}/in-progress`);
    const storedValue = localStorage.getItem('inProgressRecipes');
    const keyInProgressObject = storedValue ? JSON.parse(storedValue) : keyInProgress;
    const keyDinamic = id;
    keyInProgressObject.drinks[keyDinamic] = { id };
    const newDrinks = { ...keyInProgressObject.drinks,
      [keyDinamic]: [] };
    const newKeyInProgress = { ...keyInProgressObject, drinks: newDrinks };
    const newKeyInProgressString = JSON.stringify(newKeyInProgress);
    localStorage.setItem('inProgressRecipes', newKeyInProgressString);
  };

  const handleShare = () => {
    copy(`http://localhost:3000/drinks/${id}`);
    setIsCopy(true);
  };

  useEffect(() => {
    const storedValue = localStorage.getItem('inProgressRecipes');
    const keyInProgressObject = storedValue ? JSON.parse(storedValue) : keyInProgress;
    const keyDrinks = Object.keys(keyInProgressObject.drinks);
    const findKey = keyDrinks.find((key) => key === id);
    if (findKey) {
      setButtonName('Continue Recipe');
    }
  }, [buttonName, id]);

  useEffect(() => {
    const fetchDrinksId = async () => {
      if (pathname === `/drinks/${id}`) {
        try {
          const fetchApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
          const response = await fetchApi.json();
          const data = await response;
          setDataApi(data.drinks);
          return data.drinks;
        } catch {
          return false;
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
      } catch {
        return false;
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

  useEffect(() => {
    if (dataApi.length !== 0) {
      const checkArea = dataObject.strArea in dataObject ? dataObject[strArea] : '';
      const favoriteStorage = {
        id: dataObject.idDrink,
        type: 'drink',
        nationality: checkArea,
        category: dataObject.strCategory,
        alcoholicOrNot: dataObject.strAlcoholic,
        name: dataObject.strDrink,
        image: dataObject.strDrinkThumb,
      };
      setFavorites(favoriteStorage);
    }
  }, [dataApi]);

  const favoriteBtn = () => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', '[]');
    }
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filterStorage = local.filter((fav) => fav.id !== favorite.id);
    const findId = local.some((fav) => fav.id === favorite.id);
    if (findId === true) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterStorage));
      setFavoriteImage(favoritesImg);
    } else {
      local.push(favorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(local));
      setFavoriteImage(blackFavorite);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const storedValue = localStorage.getItem('favoriteRecipes');
      const favoriteObject = storedValue ? JSON.parse(storedValue) : storedValue;
      const findObject = favoriteObject.find((key) => key.id === id);
      if (findObject) {
        setFavoriteImage(blackFavorite);
      }
    }
  }, []);

  if (pathname === `/drinks/${id}` && dataApi.length !== 0) {
    return (
      <div>
        <div className="container-intial">
          <img
            src={ dataObject.strDrinkThumb }
            alt={ dataObject.strDrinkThumb }
            data-testid="recipe-photo"
            className="img-detail"
          />
          <div data-testid="recipe-category" id="category-alcholic">
            <div>{dataObject.strCategory}</div>
            <div>{ dataObject.strAlcoholic}</div>
          </div>
          <div data-testid="recipe-title" className="name-detail">
            { dataObject.strDrink}
          </div>
          <div className="btn-icons">
            <div>
              { isCopy
                ? <p>Link copied!</p>
                : (
                  <button
                    type="button"
                    data-testid="share-btn"
                    onClick={ handleShare }
                    className="btn-detail"
                  >
                    <img
                      src={ shareButton }
                      alt="share"
                    />
                  </button>
                )}
            </div>
            <button
              type="button"
              onClick={ favoriteBtn }
              className="btn-detail"
            >
              <img
                data-testid="favorite-btn"
                src={ favoriteImage }
                alt="favorites"
                id="favorite-btn-detail"
              />
            </button>
          </div>
        </div>
        <legend>Ingredients</legend>
        <div className="ing-content">
          {
            ingMea.map((ing, i) => (
              <div data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                {Object.keys(ing)}
                -
                {Object.values(ing)}
              </div>
            ))
          }
        </div>
        <legend>Instruction</legend>
        <div data-testid="instructions" className="instruction-details">
          { dataObject.strInstructions }
        </div>
        <legend>Recomended</legend>
        <div className="carrousel">
          <Carousel itemsToShow={ 3 }>
            { mealsRecom.map((meal) => (
              <div key={ meal.strMealThumb }>
                <Link to={ `/meals/${meal.idMeal}` }>
                  <div className="carrousel-img-lgd">
                    <img
                      src={ meal.strMealThumb }
                      alt="img-drink"
                      width="100%"
                      height="60%"
                    />
                    { meal.strMeal }
                  </div>
                </Link>
              </div>
            ))}
          </Carousel>
        </div>
        <div id="content-btn-detail">
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="btn btn-success"
            id="btn-start"
            onClick={ handleClick }
          >
            { buttonName }
          </button>
        </div>

      </div>
    );
  }
}
