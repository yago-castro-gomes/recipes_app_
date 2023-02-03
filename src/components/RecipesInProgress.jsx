import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import MealsInProgoress from './MealsInProgoress';
import DrinksInProgress from './DrinksInProgress';

export default function RecipesInProgress() {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = history.location;

  if (pathname === `/meals/${id}/in-progress`) {
    return (
      <div><MealsInProgoress /></div>
    );
  }
  if (pathname === `/drinks/${id}/in-progress`) {
    return (
      <div><DrinksInProgress /></div>
    );
  }
}
