import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Recipes from '../pages/Login';
import renderWithRouterAndRedux from './helpers/renderWith';

describe('Testando componente Recipes', () => {
  it('Testando lista inciaalizada', async () => {
    act(() => { renderWithRouterAndRedux(<Recipes />); });
    await waitFor(() => {
      for (let index = 0; index < 12; index + 1) {
        expect(screen.getByTestId(`${index}-recipe-card`).toBeInTheDocument());
        expect(screen.getByTestId(`${index}-card-img`).toBeInTheDocument());
        expect(screen.getByTestId(`${index}-card-name`).toBeInTheDocument());
      }
    });
  });
  it('Deve conter 5 botões da categoria de comidas', async () => {
    renderWithRouterAndRedux(<Recipes />);
    const categories = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat', 'Lamb', 'Miscellaneous', 'Pasta', 'Pork', 'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian'];
    await waitFor(() => {
      categories.forEach((element) => {
        expect(screen.getByTestId(`${element}-category-filte`)).toBeInTheDocument();
      });
      expect(screen.getAllByTestId(/-category-filte/g)).toHaveLength(5);
    });
  });
  it('Deve conter 5 botões da categoria de bebeidas', async () => {
    renderWithRouterAndRedux(<Recipes />);
    const categories = ['Ordinary Drink', 'Cocktail', 'Shake', 'Other', 'Unknown', 'Cocoa', 'Shot', 'Coffee', 'Tea', 'Homemade Liqueur', 'Punch', 'Party Drink', 'Beer', 'Soft Drink'];
    await waitFor(() => {
      categories.forEach((element) => {
        expect(screen.getByTestId(`${element}-category-filte`)).toBeInTheDocument();
      });
      expect(screen.getAllByTestId(/-category-filte/g)).toHaveLength(5);
    });
  });
  it('Testando filtro da categorias comidas', async () => {
    renderWithRouterAndRedux(<Recipes />);
    const buttonBeef = screen.getByTestId(/Beef-category-filte/g);
    await waitFor(() => {
      expect(buttonBeef).toBeInTheDocument();
    });
    act(() => {
      userEvent.click(buttonBeef);
    });
    await waitFor(() => {
      expect(screen.findByText(/Beef and Mustard/g));
    });
  });
  it('Testando filtro da categorias bebidas', async () => {
    renderWithRouterAndRedux(<Recipes />);
    const buttonCocktail = screen.getByTestId(/Cocktail-category-filte/g);
    await waitFor(() => {
      expect(buttonCocktail).toBeInTheDocument();
    });
    act(() => {
      userEvent.click(buttonBeef);
    });
    await waitFor(() => {
      expect(screen.findByText(/155 Belmont/g));
    });
  });
  it('Testando filtros repetidos', async () => {
    renderWithRouterAndRedux(<Recipes />);
    const buttonCocktail = screen.getByTestId(/Cocktail-category-filte/g);
    await waitFor(() => {
      expect(buttonCocktail).toBeInTheDocument();
    });
    act(() => {
      userEvent.click(buttonCocktail);
      userEvent.click(buttonCocktail);
    });
    await waitFor(() => {
      for (let index = 0; index < 12; index + 1) {
        expect(screen.getByTestId(`${index}-recipe-card`).toBeInTheDocument());
        expect(screen.getByTestId(`${index}-card-img`).toBeInTheDocument());
        expect(screen.getByTestId(`${index}-card-name`).toBeInTheDocument());
      }
      expect(screen.getAllByTestId(/-recipe-card/g)).toHaveLength(12);
    });
  });
  it('Testando redirect rota', async () => {
    renderWithRouterAndRedux(<Recipes />);
    const buttonCocktail = screen.getByTestId(/Cocktail-category-filte/g);
    await waitFor(() => {
      expect(buttonCocktail).toBeInTheDocument();
    });
    act(() => {
      userEvent.click(buttonCocktail);
    });
    await waitFor(() => {
      for (index = 0; index < 12; index + 1) {
        expect(screen.getByTestId(`${index}-recipe-card`).toBeInTheDocument());
        expect(screen.getByTestId(`${index}-card-img`).toBeInTheDocument());
        expect(screen.getByTestId(`${index}-card-name`).toBeInTheDocument());
      }
      expect(screen.getAllByTestId(/-recipe-card/g)).toHaveLength(12);
    });
  });
  it('Testando redirect rota drinks', async () => {
    const { history } = renderWithRouterAndRedux(<Recipes />);
    const buttonCocktail = screen.getByTestId(/Cocktail-category-filte/g);
    await waitFor(() => {
      expect(buttonCocktail).toBeInTheDocument();
    });
    act(() => {
      userEvent.click(buttonCocktail);
    });
    const card = screen.getByTestId(/0-recipe-card/i);
    await waitFor(() => {
      expect(card).toBeInTheDocument();
      expect(screen.getAllByTestId(/-recipe-card/g)).toHaveLength(12);
    });
    act(() => {
      userEvent.click(card);
    });
    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/drinks/15346');
    });
  });
  it('Testando redirect rota meals', async () => {
    const { history } = renderWithRouterAndRedux(<Recipes />);
    const buttonBeef = screen.getByTestId(/Beef-category-filte/g);
    await waitFor(() => {
      expect(buttonBeef).toBeInTheDocument();
    });
    act(() => {
      userEvent.click(buttonBeef);
    });
    await waitFor(() => {
      expect(screen.findByText(/Beef and Mustard/g));
    });
    const card = screen.getByTestId(/0-recipe-card/i);
    await waitFor(() => {
      expect(card).toBeInTheDocument();
      expect(screen.getAllByTestId(/-recipe-card/g)).toHaveLength(12);
    });
    act(() => {
      userEvent.click(card);
    });
    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/meals/52874');
    });
  });
});
