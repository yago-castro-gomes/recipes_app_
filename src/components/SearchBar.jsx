import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveRecipeMeals, saveRecipeDrinks } from '../redux/actions';
import {
  fetchIngredient,
  fetchName,
  fetchLetter,
  fetchDrinkIngredient,
  fetchDrinkName,
  fetchDrinkLetter,
} from '../services/apiFood';
import '../styles/searchbar.css';
import search from '../images/searchIcon.svg';

function SearchBar() {
  const [radioState, setRadioState] = useState('');
  const [textInput, setTextInput] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const { recipesMeals, recipesDrinks } = useSelector((state) => state.recipeReduce);
  const { pathname } = history.location;

  const searchApiMeals = async () => {
    if (radioState === 'Ingredient') {
      dispatch(saveRecipeMeals(await fetchIngredient(textInput)));
    }
    if (radioState === 'Name') {
      dispatch(saveRecipeMeals(await fetchName(textInput)));
    }
    if (radioState === 'FirstLetter') {
      if (textInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        dispatch(saveRecipeMeals(await fetchLetter(textInput)));
      }
    }
  };

  const searchApiDrinks = async () => {
    if (radioState === 'Ingredient') {
      dispatch(saveRecipeDrinks(await fetchDrinkIngredient(textInput)));
    }
    if (radioState === 'Name') {
      dispatch(saveRecipeDrinks(await fetchDrinkName(textInput)));
    }
    if (radioState === 'FirstLetter') {
      if (textInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        dispatch(saveRecipeDrinks(await fetchDrinkLetter(textInput)));
      }
    }
  };

  const checkRoute = async () => {
    if (pathname === '/meals') {
      await searchApiMeals();
      setTextInput('');
    }
    if (pathname === '/drinks') {
      await searchApiDrinks();
      setTextInput('');
    }
  };

  useEffect(() => {
    const changeRoute = () => {
      if (pathname === '/meals' && recipesMeals.length === 1) {
        history.push(`/meals/${recipesMeals[0].idMeal}`);
      }

      if (pathname === '/drinks' && recipesDrinks.length === 1) {
        history.push(`/drinks/${recipesDrinks[0].idDrink}`);
      }
    };
    changeRoute();
  }, [recipesMeals, recipesDrinks, history, pathname]);

  return (
    <div className="form-container">
      <div id="search-icon-img">
        <img
          src={ search }
          alt="search"
          className="icon-search"
        />
      </div>
      <div>
        <input
          value={ textInput }
          type="text"
          data-testid="search-input"
          onChange={ (e) => setTextInput(e.target.value) }
          placeholder="Write here"
          id="input-search"
        />
      </div>
      <div className="search-radio">
        <div>
          <label htmlFor="radio-search">
            <span className="name-input"> Ingredient</span>
            <input
              id="radio-search"
              className="form-check-input"
              type="radio"
              data-testid="ingredient-search-radio"
              name="radio-search"
              value="Ingredient"
              onChange={ (e) => setRadioState(e.target.value) }
            />
          </label>
        </div>
        <div>
          <label htmlFor="name-input">
            <span className="name-input">Name</span>
            <input
              id="name-input"
              className="form-check-input"
              type="radio"
              data-testid="name-search-radio"
              name="radio-search"
              value="Name"
              onChange={ (e) => setRadioState(e.target.value) }
            />
          </label>

        </div>
        <br />
        <div>
          <label htmlFor="letter-input">
            <span className="name-input">Letter</span>
            <input
              id="letter-input"
              className="form-check-input"
              type="radio"
              data-testid="first-letter-search-radio"
              name="radio-search"
              value="FirstLetter"
              onChange={ (e) => setRadioState(e.target.value) }
            />
          </label>
        </div>
      </div>
      <div id="btn-container">
        <button
          className="btn btn-success"
          type="submit"
          data-testid="exec-search-btn"
          onClick={ () => checkRoute() }
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default connect()(SearchBar);
