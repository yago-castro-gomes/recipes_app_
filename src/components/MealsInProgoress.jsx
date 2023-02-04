import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import shareButton from '../images/shareIcon.svg';
import favoritesImg from '../images/whiteHeartIcon.svg';
import { keyInProgress } from '../services/key';
import blackFavorite from '../images/blackHeartIcon.svg';
import { fetchMealWithId } from '../services/apiFood';

const copy = require('clipboard-copy');

export default function MealsInProgoress() {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = history.location;
  const [dataApi, setDataApi] = useState([]);
  const [ingMea, setIngMea] = useState([]);
  const [isCopy, setIsCopy] = useState(false);
  const [doneRecipeStorage, setDoneRecipeStorage] = useState([]);
  const [favorite, setFavorites] = useState([]);
  const [favoriteImage, setFavoriteImage] = useState(favoritesImg);

  const handleShare = () => {
    copy(`http://localhost:3000/meals/${id}`);
    setIsCopy(true);
  };

  useEffect(() => {
    const fetchMealId = async () => {
      setDataApi(await fetchMealWithId(id));
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

    const storedValue = localStorage.getItem('inProgressRecipes');
    const keyInProgressObject = storedValue ? JSON.parse(storedValue) : keyInProgress;
    const findKey = Object.keys(keyInProgressObject.meals)
      .find((mealId) => mealId === id);

    if (findKey) {
      keyInProgressObject.meals[findKey] = updateCheck;
      const newKeyInProgressString = JSON.stringify(keyInProgressObject);
      localStorage.setItem('inProgressRecipes', newKeyInProgressString);
    }
  };
  useEffect(() => {
    const storedValue2 = localStorage.getItem('inProgressRecipes');
    if (storedValue2 === null) {
      const keyInProgressObject = storedValue2 ? JSON.parse(storedValue2)
        : keyInProgress;
      const keyDinamic = id;
      keyInProgressObject.meals[keyDinamic] = { id };
      const newMeals = { ...keyInProgressObject.meals,
        [keyDinamic]: [] };
      const newKeyInProgress = { ...keyInProgressObject, drinks: newMeals };
      const newKeyInProgressString = JSON.stringify(newKeyInProgress);
      localStorage.setItem('inProgressRecipes', newKeyInProgressString);
    }
  }, []);

  useEffect(() => {
    const local = localStorage.getItem('doneRecipes');
    if (local === null) {
      localStorage.setItem('doneRecipes', '[]');
    }
    if (dataApi.length !== 0) {
      const newRecipe = {
        id: dataObject.idMeal,
        type: 'meal',
        nationality: dataObject.strArea,
        category: dataObject.strCategory,
        alcoholicOrNot: '',
        name: dataObject.strMeal,
        image: dataObject.strMealThumb,
        doneDate: new Date(),
        tags: dataObject.strTags.split(','),
      };
      setDoneRecipeStorage(newRecipe);
    }
  }, [dataApi]);

  console.log(doneRecipeStorage);

  const finishBtn = () => {
    const local = localStorage.getItem('doneRecipes');
    if (local !== null) {
      const xablau = JSON.parse(local);
      console.log(typeof local);
      xablau.push(doneRecipeStorage);
      localStorage.setItem('doneRecipes', JSON.stringify(xablau));
    }
    history.push('/done-recipes');
  };

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

  useEffect(() => {
    const storedValue = localStorage.getItem('inProgressRecipes');
    const keyInProgressObject = storedValue ? JSON.parse(storedValue) : keyInProgress;
    const findKey = Object.keys(keyInProgressObject.meals)
      .find((mealId) => mealId === id);
    if (findKey === id && keyInProgressObject.meals[id].length > 0) {
      const checkedIngs = keyInProgressObject.meals[id];
      setIngMea(checkedIngs);
    }
  }, [id, dataApi]);

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
      console.log('entrou aqui');
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
          <div>
            { isCopy
              ? <p>Link copied!</p>
              : (
                <button type="button" data-testid="share-btn" onClick={ handleShare }>
                  <img src={ shareButton } alt="share" />
                </button>
              )}
          </div>
          <button type="button" onClick={ favoriteBtn }>
            <img data-testid="favorite-btn" src={ favoriteImage } alt="favorites" />
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
                <input
                  type="checkbox"
                  name={ i }
                  onChange={ () => handdleTrough(i) }
                  checked={ ing.isChecked }
                />
              </label>
            ))
          }
        </div>
        <button
          data-testid="finish-recipe-btn"
          disabled={ !checkEvery }
          onClick={ finishBtn }
        >
          Finish
        </button>
      </div>
    );
  }
}
