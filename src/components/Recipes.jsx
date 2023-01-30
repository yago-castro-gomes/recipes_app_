import React from 'react';
import { useHistory } from 'react-router-dom';
import MealsExibithion from './MealsExibithion';
import DrinkExibithion from './DrinkExibithion';

export default function Recipes() {
  const history = useHistory();
  const { pathname } = history.location;
  if (pathname === '/meals') {
    return (
      <MealsExibithion />
    );
  }
  if (pathname === '/drinks') {
    return (
      <DrinkExibithion />
    );
  }
}
