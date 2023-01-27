import React from 'react';
import { Header } from '../components/Header';
import RecipesMeals from '../components/RecipesMeals';

export default function Meals() {
  return (
    <div>
      <Header
        title="Meals"
      />
      <RecipesMeals />
    </div>
  );
}
