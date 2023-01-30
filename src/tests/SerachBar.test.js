import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import SearchBar from '../components/SearchBar';
import renderWithRouterAndRedux from './helpers/renderWith';
import Meals from '../pages/Meals';

const INGREDIENT = /ingredient-search-radio/i;
const NAME = /name-search-radio/i;
const FISRT = /first-letter-search-radio/i;
const SEARCH_BUTTON = /exec-search-btn/i;
describe('Testando componente SearchBar', () => {
  it('Testando componentes do SearchBar', async () => {
    act(() => { renderWithRouterAndRedux(<Meals />); });
    const buttonSearch = screen.getByRole('img', {
      name: /search/i,
    });
    userEvent.click(buttonSearch);
    expect(screen.getByTestId(INGREDIENT).toBeInTheDocument());
    expect(screen.getByTestId(NAME).toBeInTheDocument());
    expect(screen.getByTestId(FISRT).toBeInTheDocument());
    expect(screen.getByTestId(SEARCH_BUTTON).toBeInTheDocument());
  });
  it('Testando redirect caso haja apenas 1 receita', async () => {
    const { history } = renderWithRouterAndRedux(<Meals />);
    act(() => {
      const buttonSearch = screen.getByRole('img', {
        name: /search/i,
      });
      userEvent.click(buttonSearch);
      const textInput = screen.getByRole('textbox');
      const NameRadio = screen.getByRole('radio', {
        name: /ingredient/i,
      });
      userEvent.type(textInput, 'Arrabiata');
      userEvent.click(NameRadio);
    });
    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/meals/52771');
    });
  });
  it('Testando o clique nos inputs radio', () => {
    act(() => { renderWithRouterAndRedux(<SearchBar />); });
    userEvent.type(NAME, 'nbfsdewfwf');
  });
});
