import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import DrinkDetails from './DrinkDetails';
import MealsDetails from './MealsDetails';

export default function RecipeDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = history.location;

  if (pathname === `/meals/${id}`) {
    return (
      <MealsDetails />
    );
  }
  if (pathname === `/drinks/${id}`) {
    return (
      <DrinkDetails />
    );
  }
}
