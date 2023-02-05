import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('Testando componente Recipe Details Meals', () => {
  const ROTA = '/meals/53060';
  const FAV = 'favorite-btn';

  it('Testando button continue recipie', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const saveInLocalStorage = '{"drinks":{},"meals":{"53060":[[{"Filo Pastry":"1 Packet"},{"Minced Beef":"150g"},{"Onion":"150g"},{"Oil":"40g"},{"Salt":"Dash"},{"Pepper":"Dash"}]]}}';
    const storage = localStorage;
    storage.setItem('inProgressRecipes', saveInLocalStorage);

    act(() => {
      history.push(ROTA);
    });

    const getLocal = storage.getItem('inProgressRecipes');

    expect(getLocal).toBe(saveInLocalStorage);
    expect(await screen.findByTestId('start-recipe-btn')).toHaveTextContent(/continue recipe/i);
  });

  it('Testando alteração de estado do componente favorite na rota Meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push(ROTA);
    });

    expect(history.location.pathname).toBe(ROTA);

    expect(await screen.findByRole('button', {
      name: /favorites/i,
    })).toBeInTheDocument();

    expect(await screen.findByTestId(FAV)).toHaveProperty('src', 'http://localhost/whiteHeartIcon.svg');

    userEvent.click(await screen.findByTestId(FAV));

    expect(await screen.findByTestId(FAV)).toHaveProperty('src', 'http://localhost/blackHeartIcon.svg');

    userEvent.click(await screen.findByTestId(FAV));

    expect(await screen.findByTestId(FAV)).toHaveProperty('src', 'http://localhost/whiteHeartIcon.svg');
  });

  it('Testando localStorage de favorite na rota Meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const storage = localStorage;
    const dataMock = '[{"id":"53060","type":"meal","nationality":"Croatian","category":"Side","alcoholicOrNot":"","name":"Burek","image":"https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg"}]';

    storage.setItem('favoriteRecipes', dataMock);

    act(() => {
      history.push(ROTA);
    });

    expect(await screen.findByTestId(FAV)).toHaveProperty('src', 'http://localhost/blackHeartIcon.svg');
    expect(storage.getItem('favoriteRecipes')).toBe(dataMock);
  });
});
