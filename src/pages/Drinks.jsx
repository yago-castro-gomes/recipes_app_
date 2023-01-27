import React from 'react';
import { Header } from '../components/Header';
import RecipesDrinks from '../components/RecipesDrinks';

export default function Drinks() {
  return (
    <div>
      <Header
        title="Drinks"
      />
      <RecipesDrinks />
    </div>
  );
}
