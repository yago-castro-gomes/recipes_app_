import React from 'react';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import drinkLogo from '../images/drinkTitle.svg';

export default function Drinks() {
  return (
    <div>
      <Header
        title="DRINKS"
        logoimg={ drinkLogo }
      />
      <Recipes />
      <Footer />
    </div>
  );
}
