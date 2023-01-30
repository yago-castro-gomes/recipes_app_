import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Favorite from './pages/Favorite';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />

      <Route exact path="/meals" component={ Meals } />
      <Route path="/meals/:id-da-receita" component={ RecipeDetails } />
      <Route path="/meals/:id-da-receita/in-progress" />

      <Route exact path="/drinks" component={ Drinks } />
      <Route path="/drinks/:id-da-receita" />
      <Route path="/drinks/:id-da-receita/in-progress" />

      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ Favorite } />
      <Route exact path="/profile" component={ Profile } />
    </Switch>
  );
}

export default App;
