import React from 'react';
// import RecipesMeals from '../components/RecipesMeals';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import MealsExibithion from '../components/MealsExibithion';

export default function Meals() {
  return (
    <div>
      <Header
        title="Meals"
      />
      <MealsExibithion />
      <Footer />
    </div>
  );
}
