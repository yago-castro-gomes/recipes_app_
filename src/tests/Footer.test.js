import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import renderWithRouterAndRedux from './helpers/renderWith';

const DRINKS = 'drinks-bottom-btn';
const MEALS = 'meals-bottom-btn';

describe('Testando o componente Footer', () => {
  it('Testa se tem um botão de drinks na página', async () => {
    renderWithRouterAndRedux(<Footer />);
    const drinkFooter = screen.getByTestId(DRINKS);
    expect(drinkFooter).toBeInTheDocument();
  });
  it('Testa se tem um botão de meals na página', async () => {
    renderWithRouterAndRedux(<Footer />);
    const mealsFooter = screen.getByTestId(MEALS);
    expect(mealsFooter).toBeInTheDocument();
  });
  it('Testa se o botão de drinks redireciona para página de drinks', () => {
    const { history } = renderWithRouterAndRedux(<Footer />);
    const drinkFooter = screen.getByTestId(DRINKS);
    userEvent.click(drinkFooter);
    waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/drinks');
    });
  });
  it('Testa se o botão de drinks redireciona para página de drinks', () => {
    const { history } = renderWithRouterAndRedux(<Footer />);
    const mealsFooter = screen.getByTestId(MEALS);
    userEvent.click(mealsFooter);
    waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/meals');
    });
  });
});
