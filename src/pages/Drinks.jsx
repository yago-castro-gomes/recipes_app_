import React from 'react';
import { Header } from '../components/Header';
import RecipesDrinks from '../components/RecipesDrinks';
import Footer from '../components/Footer';

export default function Drinks() {
  return (
    <div>
      <Header
        title="Drinks"
      />
      <RecipesDrinks />
      <Footer />
    </div>
  );
}
