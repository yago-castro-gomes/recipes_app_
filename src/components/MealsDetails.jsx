import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import Carousel from 'react-elastic-carousel';
import { fetchDrinkRecom } from '../services/apiFood';
import { keyInProgress } from '../services/key';
import shareButton from '../images/shareIcon.svg';
import '../styles/details.css';
import favoritesImg from '../images/whiteHeartIcon.svg';
import blackFavorite from '../images/blackHeartIcon.svg';

const THIRTYTWO = 32;
const copy = require('clipboard-copy');

export default function MealsDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = history.location;

  const [dataApi, setDataApi] = useState([]);
  const [drinkRecom, setDrinkRecom] = useState([]);
  const [buttonName, setButtonName] = useState('Start Recipe');
  const [ingMea, setIngMea] = useState([]);
  const [favorite, setFavorites] = useState([]);
  const [favoriteImage, setFavoriteImage] = useState(favoritesImg);
  const [isCopy, setIsCopy] = useState(false);

  const handleShare = () => {
    copy(`http://localhost:3000/meals/${id}`);
    setIsCopy(true);
  };

  const handleClick = () => {
    history.push(`/meals/${id}/in-progress`);
    const storedValue = localStorage.getItem('inProgressRecipes');
    const keyInProgressObject = storedValue ? JSON.parse(storedValue) : keyInProgress;
    const keyDinamic = id;
    // if (!keyInProgressObject.meals) {
    //   keyInProgressObject.meals = {};
    // }
    keyInProgressObject.meals[keyDinamic] = { id };
    const newMeals = { ...keyInProgressObject.meals,
      [keyDinamic]: [] };
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
  }, [buttonName, id]);

  useEffect(() => {
    const fetchMealId = async () => {
      if (pathname === `/meals/${id}`) {
        try {
          const fetchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          const response = await fetchApi.json();
          const data = await response;
          setDataApi(data.meals);
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
    if (dataApi.length !== 0) {
      const favoriteStorage = {
        id: dataObject.idMeal,
        type: 'meal',
        nationality: dataObject.strArea,
        category: dataObject.strCategory,
        alcoholicOrNot: '',
        name: dataObject.strMeal,
        image: dataObject.strMealThumb,
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
        setIngMea(ingAndMeaArray);
      }
    };
    setArrayMealsAndIng();
  }, [dataApi, dataObject]);

  if (pathname === `/meals/${id}` && dataApi.length !== 0) {
    const stringYtt = dataObject.strYoutube.slice(THIRTYTWO);

    return (
      <div>
        <div className="container-intial">
          <img
            src={ dataObject.strMealThumb }
            alt={ dataObject.strMealThumb }
            data-testid="recipe-photo"
            className="img-detail"
          />
          <div data-testid="recipe-category" id="category-detail">
            {dataObject.strCategory}
          </div>
          <div data-testid="recipe-title" className="name-detail">
            {dataObject.strMeal}
          </div>
          <div className="btn-icons">
            <div>
              <div>
                { isCopy
                  ? <p id="copied">Link copied!</p>
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
                {/* eslint-disable-next-line */}
                <img
                  data-testid="favorite-btn"
                  src={ favoriteImage }
                  alt="favorites"
                  id="favorite-btn-detail"
                />
              </button>
            </div>
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
        <legend>Recomended</legend>
        <div className="carrousel">
          <Carousel itemsToShow={ 3 }>
            { drinkRecom.map((drink) => (
              <div key={ drink.strDrinkThumb }>
                <Link to={ `/drinks/${drink.idDrink}` }>
                  <div className="carrousel-img-lgd">
                    <img
                      src={ drink.strDrinkThumb }
                      alt="img-drink"
                      width="100%"
                      height="60%"
                    />
                    { drink.strDrink }
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
