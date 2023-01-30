import React from 'react';
// import RecipesMeals from '../components/RecipesMeals';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

export default function Meals() {
  return (
    <div>
      <Header
        title="Meals"
      />
      <Recipes />
      <Footer />
    </div>
  );
}
