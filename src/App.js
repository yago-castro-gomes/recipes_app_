import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import RecipeDetails from './components/RecipeDetails';
import RecipesInProgress from './components/RecipesInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />

      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/meals/:id" component={ RecipeDetails } />
      <Route path="/meals/:id/in-progress" component={ RecipesInProgress } />

      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route path="/drinks/:id/in-progress" component={ RecipesInProgress } />

      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/profile" component={ Profile } />
    </Switch>
  );
}

export default App;
