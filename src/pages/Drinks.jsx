import React from 'react';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

export default function Drinks() {
  return (
    <div>
      <Header
        title="Drinks"
      />
      <Recipes />
      <Footer />
    </div>
  );
}
