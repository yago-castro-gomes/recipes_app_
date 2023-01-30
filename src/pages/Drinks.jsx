import React from 'react';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import DrinkExibithion from '../components/DrinkExibithion';

export default function Drinks() {
  return (
    <div>
      <Header
        title="Drinks"
      />
      <DrinkExibithion />
      <Footer />
    </div>
  );
}
