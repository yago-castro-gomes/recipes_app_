import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import shareButton from '../images/shareIcon.svg';
import favoritesImg from '../images/whiteHeartIcon.svg';
import { keyInProgress } from '../services/key';

const copy = require('clipboard-copy');

export default function DrinksInProgoress() {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = history.location;
  const [dataApi, setDataApi] = useState([]);
  const [ingMea, setIngMea] = useState([]);
  const [isCopy, setIsCopy] = useState(false);
  const [doneRecipeStorage, setDoneRecipeStorage] = useState([]);

  const handleShare = () => {
    copy(`http://localhost:3000/drinks/${id}`);
    setIsCopy(true);
  };

  useEffect(() => {
    const fetchDrinksId = async () => {
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
    };
    fetchDrinksId();
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
    const keyInProgressObject = storedValue ? JSON.parse(storedValue)
      : localStorage.setItem('inProgressRecipes', JSON.stringify(keyInProgress));
    const findKey = Object.keys(keyInProgressObject.drinks)
      .find((drinkId) => drinkId === id);
    if (findKey) {
      keyInProgressObject.drinks[findKey] = updateCheck;
      const newKeyInProgressStringx = JSON.stringify(keyInProgressObject);
      localStorage.setItem('inProgressRecipes', newKeyInProgressStringx);
    }
  };

  useEffect(() => {
    const storedValue2 = localStorage.getItem('inProgressRecipes');
    if (storedValue2 === null) {
      const keyInProgressObject = storedValue2 ? JSON.parse(storedValue2)
        : keyInProgress;
      const keyDinamic = id;
      keyInProgressObject.drinks[keyDinamic] = { id };
      const newDrinks = { ...keyInProgressObject.drinks,
        [keyDinamic]: [] };
      const newKeyInProgress = { ...keyInProgressObject, drinks: newDrinks };
      const newKeyInProgressString = JSON.stringify(newKeyInProgress);
      localStorage.setItem('inProgressRecipes', newKeyInProgressString);
    }
  }, []);

  useEffect(() => {
    const storedValue = localStorage.getItem('inProgressRecipes');
    const keyInProgressObjectSaved = storedValue ? JSON.parse(storedValue)
      : keyInProgress;
    const findKey = Object.keys(keyInProgressObjectSaved.drinks)
      .find((drinkId) => drinkId === id);
    if (findKey && keyInProgressObjectSaved.drinks[id].length > 0) {
      const checkedIngs = keyInProgressObjectSaved.drinks[id];
      setIngMea(checkedIngs);
    }
    console.log(ingMea);
  }, [id, dataApi]);

  useEffect(() => {
    const local = localStorage.getItem('doneRecipes');
    if (local === null) {
      localStorage.setItem('doneRecipes', '[]');
    }
    if (dataApi.length !== 0) {
      const newRecipe = {
        id: dataObject.idDrink,
        type: 'drink',
        nationality: dataObject.strArea,
        category: dataObject.strCategory,
        alcoholicOrNot: dataObject.strAlcoholic,
        name: dataObject.strDrink,
        image: dataObject.strDrinkThumb,
        doneDate: new Date(),
        tags: [],
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

  if (pathname === `/drinks/${id}/in-progress` && dataApi.length !== 0) {
    const checkEvery = ingMea.every((check) => check.isChecked === true);
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ dataObject.strDrinkThumb }
          alt={ dataObject.strDrinkThumb }
          width="30%"
        />
        <div data-testid="recipe-title">{ dataObject.strDrink }</div>
        <div>
          <div>
            { isCopy
              ? <p>Link copied!</p>
              : (
                <button
                  type="button"
                  data-testid="share-btn"
                  onClick={ handleShare }
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
          { dataObject.strAlcoholic }
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
