import React from 'react';
// import RecipesMeals from '../components/RecipesMeals';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import mealsIconTitle from '../images/melasTitle.svg';
import '../styles/recipes.css'

export default function Meals() {
  return (
    <div>
      <Header
        title="MEALS"
        logoimg={ mealsIconTitle }
      />
      <Recipes />
      <Footer />
    </div>
  );
}
