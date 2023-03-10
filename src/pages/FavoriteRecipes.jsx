import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import shareButton from '../images/shareIcon.svg';
import blackFavorite from '../images/blackHeartIcon.svg';
import favoritesImg from '../images/whiteHeartIcon.svg';
import '../styles/favorite.css';

const copy = require('clipboard-copy');

export default function FavoriteRecipes() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [isCopy, setIsCopy] = useState(false);
  const [buttonFilter, setButtonFilter] = useState('All');
  const [favoriteImage, setFavoriteImage] = useState(favoritesImg);

  const handleShare = (type, id, e) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setIsCopy(true);
    console.log(e);
  };

  useEffect(() => {
    const local = localStorage.getItem('favoriteRecipes');
    if (local === null) {
      localStorage.setItem('favoriteRecipes', '[]');
    }
    if (local !== null) {
      const parseStorage = JSON.parse(local);
      setAllRecipes(parseStorage);
    }
  }, []);

  useEffect(() => {
    if (buttonFilter === 'Meal') {
      const local = localStorage.getItem('favoriteRecipes');
      const parseStorage = JSON.parse(local);
      const filterMeals = parseStorage.filter((meal) => meal.type === 'meal');
      setAllRecipes(filterMeals);
    }
    if (buttonFilter === 'Drink') {
      const local = localStorage.getItem('favoriteRecipes');
      const parseStorage = JSON.parse(local);
      const filterDrinks = parseStorage.filter((drink) => drink.type === 'drink');
      setAllRecipes(filterDrinks);
    }
    if (buttonFilter === 'All') {
      const local = localStorage.getItem('favoriteRecipes');
      const parseStorage = JSON.parse(local);
      setAllRecipes(parseStorage);
    }
  }, [buttonFilter]);

  const localStoraUperScope = localStorage.getItem('favoriteRecipes');
  if (localStoraUperScope === null) {
    localStorage.setItem('favoriteRecipes', '[]');
  }

  useEffect(() => {
    const local = localStorage.getItem('favoriteRecipes');
    if (local !== null) {
      const parseStorage = JSON.parse(local);
      const favoriteCheck = parseStorage
        .map((check) => ({ ...check, isFavorite: true }));
      setAllRecipes(favoriteCheck);
    }
  }, [localStoraUperScope]);

  useEffect(() => {
    const checkFavoriteRecipes = allRecipes.forEach((check) => {
      if (check.isFavorite === true) {
        setFavoriteImage(blackFavorite);
      }
    });
    return checkFavoriteRecipes;
  }, [allRecipes]);

  const favoriteBtn = (i) => {
    const updateCheck = [...allRecipes];
    updateCheck[i].isFavorite = !updateCheck[i].isFavorite;
    if (updateCheck[i].isFavorite === false) {
      const local = localStorage.getItem('favoriteRecipes');
      const parseStorage = JSON.parse(local);
      const filterStorage = parseStorage.filter((fav) => fav.id !== updateCheck[i].id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterStorage));
      setAllRecipes(filterStorage);
    }
  };

  console.log(allRecipes);

  return (
    <div>
      <Header
        title="Favorite Recipes"
        visible={ false }
        logoimg={ favoritesImg }
      />
      <div>
        <div className="favorite-btn-content">
          <div>
            <button
              data-testid="filter-by-all-btn"
              onClick={ (e) => setButtonFilter(e.target.value) }
              value="All"
              className="btn-favorite"
              id="favorite-All"
            />
            <div>All</div>
          </div>
          <div>
            <button
              data-testid="filter-by-meal-btn"
              onClick={ (e) => setButtonFilter(e.target.value) }
              value="Meal"
              className="btn-favorite"
              id="favorite-meal"
            />
            <div>Meals</div>
          </div>
          <div>
            <button
              data-testid="filter-by-drink-btn"
              onClick={ (e) => setButtonFilter(e.target.value) }
              value="Drink"
              className="btn-favorite"
              id="favorite-drink"
            />
            <div>Drinks</div>
          </div>
        </div>
        <div>
          <div className="favorite-content">
            { allRecipes.map((recipe, index) => (
              <div key={ index }>
                <div className="card-favorite-content">
                  <div className="favorite-name">
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
                  </div>
                  <div className="card-favorite">
                    <Link to={ `/${recipe.type}s/${recipe.id}` }>
                      <div className="favorite-image">
                        <img
                          data-testid={ `${index}-horizontal-image` }
                          src={ recipe.image }
                          alt={ recipe.name }
                          width="40%"
                          className="favorite-image-card"
                        />
                      </div>
                    </Link>
                  </div>
                  <label htmlFor="btnShare">
                    <div>
                      { isCopy
                        ? <p>Link copied!</p>
                        : (
                          <div className="btn-img-content">
                            <button
                              type="button"
                              onClick={ (e) => handleShare(recipe.type, recipe.id, e) }
                              id="btnShare"
                              className="btn-share-img"
                            >
                              <img
                                data-testid={ `${index}-horizontal-share-btn` }
                                src={ shareButton }
                                alt="share"
                              />
                            </button>
                            <button
                              type="button"
                              onClick={ () => favoriteBtn(index) }
                              className="btn-favorite-img"
                            >
                              <img
                                data-testid={ `${index}-horizontal-favorite-btn` }
                                src={ favoriteImage }
                                alt="favorites"
                              />
                            </button>
                          </div>
                        )}
                    </div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
