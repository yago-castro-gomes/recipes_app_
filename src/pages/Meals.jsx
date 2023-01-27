import React from 'react';
import { Header } from '../components/Header';
import RecipesMeals from '../components/RecipesMeals';
import Footer from '../components/Footer';

export default function Meals() {
  return (
    <div>
      <Header
        title="Meals"
      />
      <RecipesMeals />
      <Footer />
    </div>
  );
}
