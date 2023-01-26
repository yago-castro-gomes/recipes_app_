import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Favorite from './pages/Favorite';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />

      <Route path="/meals" component={ Meals } />
      <Route path="/meals/:id-da-receita" />
      <Route path="/meals/:id-da-receita/in-progress" />

      <Route path="/drinks" component={ Drinks } />
      <Route path="/drinks/:id-da-receita" />
      <Route path="/drinks/:id-da-receita/in-progress" />

      <Route path="/done-recipes" component={ Recipes } />
      <Route path="/favorite-recipes" component={ Favorite } />
      <Route path="/profile" component={ Profile } />
    </Switch>
  );
}

export default App;
