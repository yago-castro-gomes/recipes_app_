import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

describe('Testando componente Recipes', () => {
  it('Testando componente Recipes na rota Meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/meals');
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals');
      for (let index = 0; index < 12; index += 1) {
        expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
      }
    });

    const categoriesMeals = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];

    await waitFor(() => {
      categoriesMeals.forEach((element) => {
        expect(screen.getByTestId(`${element}-category-filter`)).toBeInTheDocument();

        act(() => {
          userEvent.click(screen.getByTestId(`${element}-category-filter`));
        });

        for (let index = 0; index < 12; index += 1) {
          expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
        }

        act(() => {
          userEvent.click(screen.getByRole('button', {
            name: /all/i,
          }));
        });
        expect(screen.getByText(/Corba/i)).toBeInTheDocument();
      });
    });
  });

  it('Testando componente Recipes na rota Meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    await act(async () => {
      history.push('/drinks');
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks');
      for (let index = 0; index < 12; index += 1) {
        expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
      }
    });

    const categoriesDrinks = ['Ordinary Drink', 'Cocktail', 'Shake', 'Other / Unknown', 'Cocoa'];

    await waitFor(() => {
      categoriesDrinks.forEach((drink) => {
        expect(screen.getByTestId(`${drink}-category-filter`)).toBeInTheDocument();

        act(() => {
          userEvent.click(screen.getByTestId(`${drink}-category-filter`));
        });

        for (let index = 0; index < 12; index += 1) {
          expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
        }

        act(() => {
          userEvent.click(screen.getByRole('button', {
            name: /all/i,
          }));
        });
        expect(screen.getByText(/gg/i)).toBeInTheDocument();
      });
    });
  });

  it('Testando Fetch Recipes na rota Drinks', async () => {
    // jest.clearAllMocks();

    const { history } = renderWithRouterAndRedux(<App />);

    await act(async () => {
      history.push('/drinks');
    });

    globalThis.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([]),
    });

    expect(history.location.pathname).toBe('/drinks');
    expect(global.fetch).not.toBeCalled();
  });
});
