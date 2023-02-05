import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import shareButton from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function DoneRecipes() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [isCopy, setIsCopy] = useState(false);
  const [buttonFilter, setButtonFilter] = useState('All');

  const handleShare = (type, id, e) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setIsCopy(true);
    console.log(e);
  };

  useEffect(() => {
    const local = localStorage.getItem('doneRecipes');
    const parseStorage = JSON.parse(local);
    setAllRecipes(parseStorage);
  }, []);

  useEffect(() => {
    if (buttonFilter === 'Meal') {
      const local = localStorage.getItem('doneRecipes');
      const parseStorage = JSON.parse(local);
      const filterMeals = parseStorage.filter((meal) => meal.type === 'meal');
      setAllRecipes(filterMeals);
    }
    if (buttonFilter === 'Drink') {
      const local = localStorage.getItem('doneRecipes');
      const parseStorage = JSON.parse(local);
      const filterDrinks = parseStorage.filter((drink) => drink.type === 'drink');
      setAllRecipes(filterDrinks);
    }
    if (buttonFilter === 'All') {
      const local = localStorage.getItem('doneRecipes');
      const parseStorage = JSON.parse(local);
      setAllRecipes(parseStorage);
    }
  }, [buttonFilter]);

  console.log(buttonFilter);
  return (
    <div>
      <Header
        title="Done Recipes"
        visible={ false }
      />
      <button
        data-testid="filter-by-all-btn"
        onClick={ (e) => setButtonFilter(e.target.value) }
        value="All"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ (e) => setButtonFilter(e.target.value) }
        value="Meal"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ (e) => setButtonFilter(e.target.value) }
        value="Drink"
      >
        Drinks
      </button>
      <div>
        { allRecipes.map((recipe, index) => (
          <div key={ index }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
                width="40%"
              />
            </Link>
            <div data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.nationality} - ${recipe.category}`}
            </div>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <div data-testid={ `${index}-horizontal-name` }>
                { recipe.name }
              </div>
            </Link>
            <div data-testid={ `${index}-horizontal-done-date` }>
              { recipe.doneDate}
            </div>
            <div data-testid={ `${index}-horizontal-top-text` }>
              { recipe.alcoholicOrNot }
            </div>
            <label htmlFor="btnShare">
              <div>
                { isCopy
                  ? <p>Link copied!</p>
                  : (
                    <button
                      type="button"
                      onClick={ (e) => handleShare(recipe.type, recipe.id, e) }
                      id="btnShare"
                    >
                      <img
                        data-testid={ `${index}-horizontal-share-btn` }
                        src={ shareButton }
                        alt="share"
                      />
                    </button>
                  )}
              </div>
            </label>
            <div
              data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }
            >
              { recipe.tags[0]}
            </div>
            <div
              data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }
            >
              { recipe.tags[1]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
