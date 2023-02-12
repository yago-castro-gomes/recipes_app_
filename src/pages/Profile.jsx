import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import '../styles/profile.css';

export default function Profile() {
  const [numFavorite, setNumFavorite] = useState(0);
  const [numDone, setNumDone] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const history = useHistory();
  const getStorageEmail = () => {
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      const { email } = JSON.parse(localStorage.getItem('user'));
      return email;
    }
  };
  const getlocal = getStorageEmail();

  const clearUser = () => {
    localStorage.clear('user');
    history.push('/');
  };

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const localFav = localStorage.getItem('favoriteRecipes');
      const favParse = JSON.parse(localFav);
      setNumFavorite(favParse.length);
    }
    if (localStorage.getItem('doneRecipes') !== null) {
      const localDone = localStorage.getItem('doneRecipes');
      const doneParse = JSON.parse(localDone);
      setNumDone(doneParse.length);
    }
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const localProgress = localStorage.getItem('inProgressRecipes');
      const progressParse = JSON.parse(localProgress);
      const arrayProgressDrinks = progressParse.drinks;
      const findNumDrinks = Object.keys(arrayProgressDrinks);
      const arrayProgressMeals = progressParse.meals;
      const findNumMeals = Object.keys(arrayProgressMeals);
      const sumDrinksMeals = findNumDrinks.length + findNumMeals.length;
      setInProgress(sumDrinksMeals);
    }
  }, []);

  return (
    <div className="profile-bg">
      <Header
        title="Profile"
        visible={ false }
      />
      <div id="profile-email">
        <p data-testid="profile-email">{ getlocal }</p>
      </div>
      <div>
        <div className="profile-content">
          <div>
            {/* eslint-disable-next-line */}
            <button
              type="button"
              data-testid="profile-done-btn"
              onClick={ () => history.push('/done-recipes') }
              className="profile-btn"
              id="done-profile"
            />
            <div>Done Recipes</div>
            {/* eslint-disable-next-line */}
          </div>
          <div>
            {/* eslint-disable-next-line */}
            <button
              type="button"
              data-testid="profile-favorite-btn"
              onClick={ () => history.push('/favorite-recipes') }
              className="profile-btn"
              id="favorite-profile"
            />
            <div>Favorite Recipes</div>
          </div>
        </div>
        <div className="static-container">
          <legend>MY INFOS</legend>
          <div className="static-profile">
            <div>
              {/* eslint-disable-next-line */}
              <div className="num-progress">{ numFavorite }</div>
              {/* eslint-disable-next-line */}
              <div>Favorites</div>
            </div>
            <div>
              {/* eslint-disable-next-line */}
              <div className="num-progress">{numDone}</div>
              {/* eslint-disable-next-line */}
              <div>Recipes Done</div>
            </div>
            <div>
              {/* eslint-disable-next-line */}
              <div className="num-progress">{ inProgress }</div>
              {/* eslint-disable-next-line */}
              <div>In Progress</div>
            </div>
          </div>
        </div>
        <div id="logout-container">
          {/* eslint-disable-next-line */}
          <button
            type="button"
            data-testid="profile-logout-btn"
            to="/"
            onClick={ () => { clearUser(); } }
            id="logout-btn"
            className="profile-btn"
          />
          <div>Logout</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
