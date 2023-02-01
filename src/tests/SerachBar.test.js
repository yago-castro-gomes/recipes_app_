import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

const INGREDIENT = /ingredient-search-radio/i;
const NAME = /name-search-radio/i;
const LETTER = /first-letter-search-radio/i;
const SEARCH_BUTTON = /search-top-btn/i;
const PROFILE = /profile/i;
const BOARD = /search-input/i;
const SEARCH = /exec-search-btn/i;

describe('Testando componente SearchBar', () => {
  it('Testando input Ingredient da rota Meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    const { location: { pathname } } = history;

    await act(async () => {
      expect(pathname).toBe('/meals');
      expect(screen.getByTestId(PROFILE)).toBeInTheDocument();
      expect(screen.getByTestId(SEARCH_BUTTON)).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    });

    await waitFor(() => {
      expect(screen.getByTestId(INGREDIENT)).toBeInTheDocument();
      expect(screen.getByTestId(NAME)).toBeInTheDocument();
      expect(screen.getByTestId(LETTER)).toBeInTheDocument();
      expect(screen.getByTestId(BOARD)).toBeInTheDocument();
      expect(screen.getByTestId(SEARCH)).toBeInTheDocument();
    });

    act(() => {
      userEvent.type(screen.getByTestId(BOARD), 'rice');
      userEvent.click(screen.getByRole('radio', {
        name: /ingredient/i,
      }));
    });

    userEvent.click(screen.getByText(/search/i));

    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });

    await waitFor(() => {
      expect(screen.getByText('Chicken Congee')).toBeInTheDocument();
      expect(buttonAll).toBeInTheDocument();
    });
  });
});

it('Testando input name da rota Meals', async () => {
  const { history } = renderWithRouterAndRedux(<App />);
  act(() => {
    history.push('/meals');
  });
  await waitFor(async () => {
    expect(screen.getByText('Corba')).toBeInTheDocument();
  });
  act(() => {
    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
  });
  act(() => {
    userEvent.type(screen.getByTestId(BOARD), 'beef');
    userEvent.click(screen.getByRole('radio', {
      name: /name/i,
    }));
  });

  userEvent.click(screen.getByText(/search/i));

  await waitFor(() => {
    expect(screen.getByText('Beef Lo Mein')).toBeInTheDocument();
  });
});

it('Testando input Letter da rota Meals', async () => {
  const { history } = renderWithRouterAndRedux(<App />);
  act(() => {
    history.push('/meals');
  });

  await waitFor(() => {
    expect(screen.getByText('Corba')).toBeInTheDocument();
  });

  act(() => {
    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
  });

  act(() => {
    userEvent.type(screen.getByTestId(BOARD), 'l');
    userEvent.click(screen.getByRole('radio', {
      name: /letter/i,
    }));
  });

  act(() => {
    userEvent.click(screen.getByText(/search/i));
  });

  await waitFor(() => {
    expect(screen.getByText('Lamb Biryani')).toBeInTheDocument();
  });
});

it('Testando click em receita e verificação de redirect na rota Meals', async () => {
  const { history } = renderWithRouterAndRedux(<App />);
  act(() => {
    history.push('/meals');
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe('/meals');
    expect(screen.getByText(/corba/i)).toBeInTheDocument();
  });

  await act(async () => {
    userEvent.click(screen.getByText(/corba/i));
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe('/meals/52977');
  });
});

it('Testando redirect quando houver apenas 1 receita na rota Meals', async () => {
  const { history } = renderWithRouterAndRedux(<App />);
  act(() => {
    history.push('/meals');
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe('/meals');
  });

  act(() => {
    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
  });

  act(() => {
    userEvent.type(screen.getByTestId(BOARD), 'Spicy Arrabiata Penne');
    userEvent.click(screen.getByRole('radio', {
      name: /Name/i,
    }));
  });

  act(() => {
    userEvent.click(screen.getByText(/search/i));
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe('/meals/52771');
  });
});

it('Testando rota Drinks e', async () => {
  const { history } = renderWithRouterAndRedux(<App />);
  act(() => {
    history.push('/meals');
  });

  await act(async () => {
    userEvent.click(screen.getByRole('button', {
      name: /drinks/i,
    }));
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe('/drinks');
    expect(screen.getByText('GG')).toBeInTheDocument();
    expect(screen.getByText(/drinks/i)).toBeInTheDocument();
  });

  act(() => {
    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
  });

  await act(async () => {
    userEvent.clear(screen.getByTestId(BOARD));
    userEvent.type(screen.getByTestId(BOARD), 'Galliano');
    userEvent.click(screen.getByRole('radio', {
      name: /ingredient/i,
    }));
  });

  act(() => {
    userEvent.click(screen.getByText(/search/i));
  });

  await waitFor(() => {
    expect(screen.getByText(/barracuda/i)).toBeInTheDocument();
  });

  await act(async () => {
    userEvent.clear(screen.getByTestId(BOARD));
    userEvent.type(screen.getByTestId(BOARD), 'gg');
    userEvent.click(screen.getByRole('radio', {
      name: /Name/i,
    }));
  });

  act(() => {
    userEvent.click(screen.getByText(/search/i));
  });

  await waitFor(() => {
    expect(screen.getByText(/GG/i)).toBeInTheDocument();
  });

  await act(async () => {
    userEvent.click(screen.getByText(/GG/i));
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe('/drinks/15997');
  });

  act(() => {
    history.push('/drinks');
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe('/drinks');
  });

  act(() => {
    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
  });

  await act(async () => {
    userEvent.clear(screen.getByTestId(BOARD));
    userEvent.type(screen.getByTestId(BOARD), 'l');
    userEvent.click(screen.getByRole('radio', {
      name: /letter/i,
    }));
  });

  act(() => {
    userEvent.click(screen.getByText(/search/i));
  });

  await waitFor(() => {
    expect(screen.getByText(/limeade/i)).toBeInTheDocument();
  });

  await act(async () => {
    userEvent.clear(screen.getByTestId(BOARD));
    userEvent.type(screen.getByTestId(BOARD), 'Aquamarine');
    userEvent.click(screen.getByRole('radio', {
      name: /Name/i,
    }));
  });

  act(() => {
    userEvent.click(screen.getByText(/search/i));
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe('/drinks/178319');
  });

  act(() => {
    history.push('/drinks');
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe('/drinks');
    expect(screen.getByRole('img', {
      name: /meal/i,
    })).toBeInTheDocument();
  });

  act(() => {
    userEvent.click(screen.getByRole('img', {
      name: /meal/i,
    }));
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe('/meals');
  });
});
