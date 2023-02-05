import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

describe('Testando Rota Drinks Details', () => {
  it('Testando componentes da rota Drinks Details', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const FAV = 'favorite-btn';
    act(() => {
      history.push('/drinks');
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks');
      expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
    });

    await act(async () => {
      userEvent.click(screen.getByTestId('0-recipe-card'));
    });

    expect(history.location.pathname).toBe('/drinks/15997');

    expect(await screen.findByRole('button', {
      name: /share/i,
    })).toBeInTheDocument();

    expect(await screen.findByRole('button', {
      name: /favorites/i,
    })).toBeInTheDocument();

    expect(await screen.findByRole('button', {
      name: /start recipe/i,
    })).toBeInTheDocument();

    expect(await screen.findByTestId(FAV)).toHaveProperty('src', 'http://localhost/whiteHeartIcon.svg');

    userEvent.click(await screen.findByTestId(FAV));

    expect(await screen.findByTestId(FAV)).toHaveProperty('src', 'http://localhost/blackHeartIcon.svg');

    userEvent.click(await screen.findByTestId(FAV));

    expect(await screen.findByTestId(FAV)).toHaveProperty('src', 'http://localhost/whiteHeartIcon.svg');
  });

  it('Testando localStorage de Favorites Recipes', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const dataMock = '[{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg"}]';
    const storage = localStorage;
    storage.setItem('favoriteRecipes', dataMock);

    act(() => {
      history.push('/drinks/15997');
    });

    const getStorage = storage.getItem('favoriteRecipes');

    expect(getStorage).toBe(dataMock);
    expect(await screen.findByTestId('favorite-btn')).toHaveProperty('src', 'http://localhost/blackHeartIcon.svg');
  });

  // it('Testando copy da função share na rota drinks', async () => {
  //   const { history } = renderWithRouterAndRedux(<App />);

  //   act(() => {
  //     history.push('/drinks/15997');
  //   });

  //   userEvent.click(await screen.findByTestId('share-btn'));

  //   expect(await screen.findByText(/link copied!/i)).toBeInTheDocument();
  // });
});
