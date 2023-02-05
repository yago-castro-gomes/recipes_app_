import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

const CORBA = '/meals/52977';
const DRINK = '/drinks/14610';

describe('Testando componente Recipe Details', () => {
  it('Testando Redirect para Recipe Details - Meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/meals');
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals');
      expect(screen.getByText(/corba/i)).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByText(/corba/i));
    });

    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe(CORBA);
    });
  });

  it('Testando Redirect para Recipe Detaisl - Drinks', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/drinks');
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks');
      expect(screen.getByText(/A1/i)).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByText(/A1/i));
    });

    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/drinks/17222');
    });
  });

  it('Testantando componentes da rota Recipe Detaisl - Meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/meals');
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals');
      expect(screen.getByText(/Corba/i)).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByText(/Corba/i));
    });

    waitFor(() => {
      expect(screen.getByRole('button', {
        name: /share/i,
      })).toBeInTheDocument();
      expect(screen.getByAltText(/favorites/i)).toBeInTheDocument();
    });

    const listItems = ['Lentils-1 cup',
      'Onion-1 large',
      'Carrots-1 large',
      'Tomato Puree-1 tbs',
      'Cumin-2 tsp',
      'Paprika-1 tsp',
      'Mint-1/2 tsp',
      'Thyme-1/2 tsp',
      'Black Pepper-1/4 tsp',
      'Red Pepper Flakes-1/4 tsp',
      'Vegetable Stock-4 cups',
      'Water-1 cup',
      'Sea Salt-Pinch'];

    const steps = ['Pick through your lentils for any foreign debris, rinse them 2 or 3 times, drain, and set aside. Fair warning, this will probably turn your lentils into a solid block that you’ll have to break up later In a large pot over medium-high heat, sauté the olive oil and the onion with a pinch of salt for about 3 minutes, then add the carrots and cook for another 3 minutes. Add the tomato paste and stir it around for around 1 minute. Now add the cumin, paprika, mint, thyme, black pepper, and red pepper as quickly as you can and stir for 10 seconds to bloom the spices. Congratulate yourself on how amazing your house now smells. Immediately add the lentils, water, broth, and salt. Bring the soup to a (gentle) boil. After it has come to a boil, reduce heat to medium-low, cover the pot halfway, and cook for 15-20 minutes or until the lentils have fallen apart and the carrots are completely cooked. After the soup has cooked and the lentils are tender, blend the soup either in a blender or simply use a hand blender to reach the consistency you desire. Taste for seasoning and add more salt if necessary. Serve with crushed-up crackers, torn up bread, or something else to add some extra thickness. You could also use a traditional thickener (like cornstarch or flour), but I prefer to add crackers for some texture and saltiness. Makes great leftovers, stays good in the fridge for about a week.'];

    await waitFor(() => {
      expect(history.location.pathname).toBe(CORBA);
      expect(screen.getByTestId(/recipe-photo/)).toBeInTheDocument();
      expect(screen.getByText(/corba/i)).toBeInTheDocument();
      expect(screen.getByText(/corba/i)).toBeInTheDocument();
      listItems.forEach((element) => {
        expect(screen.getByText(element)).toBeInTheDocument();
      });
      expect(screen.getByText(steps)).toBeInTheDocument();
      expect(screen.getByTestId(/video/i)).toBeInTheDocument();
    });
  });

  it('Testantando componentes da rota Recipe Detaisl - Drinks', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/drinks');
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks');
      expect(screen.getByText(/ACID/i)).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByText(/acid/i));
    });

    waitFor(() => {
      expect(screen.getByRole('button', {
        name: /share/i,
      })).toBeInTheDocument();
      expect(screen.getByAltText(/favorites/i)).toBeInTheDocument();
    });

    const steps = [/Poor in the 151 first followed by the 101 served with a Coke or Dr Pepper chaser./i, /Poor in the 151 first followed by the 101 served with a Coke or Dr Pepper chaser./i];
    const items = [/151 proof rum-1 oz Bacardi/i, /Wild Turkey-1 oz/i];

    await waitFor(() => {
      expect(history.location.pathname).toBe(DRINK);
      expect(screen.getByText(/ACID/i)).toBeInTheDocument();
      expect(screen.getByText(/acid/i)).toBeInTheDocument();
      steps.forEach((element) => {
        expect(screen.getAllByText(element)).toHaveLength(2);
      });
      items.forEach((element) => {
        expect(screen.getByText(element)).toBeInTheDocument();
      });
      expect(screen.getByRole('img', {
        name: /https:\/\/www\.thecocktaildb\.com\/images\/media\/drink\/xuxpxt1479209317\.jpg/i,
      })).toBeInTheDocument();
    });
  });

  it('Testando a presença de componentes na rota Drinks', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const ROTA = '/drinks/15288';

    act(() => {
      history.push(ROTA);
    });

    await waitFor(() => {
      expect(screen.getByRole('button', {
        name: 'Start Recipe',
      })).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByRole('button', {
        name: /Start Recipe/i,
      }));
    });

    waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/15288/in-progress');
    });

    act(() => {
      history.push(ROTA);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe(ROTA);
      expect(screen.getByText(/continue recipe/i)).toBeInTheDocument();
    });
  });

  it('Testando redirect para rota progress', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/meals/52844');
    });

    waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52844');
    });

    const buttonStart = await screen.findByText(/start recipe/i);

    act(() => {
      userEvent.click(buttonStart);
    });

    const storage = localStorage.getItem('inProgressRecipes');

    const saveInLocalStorage = '{"drinks":{},"meals":{"52844":[[{"Olive Oil":"1 tblsp "},{"Bacon":"2"},{"Onion":"1 finely chopped "},{"Celery":"1 Stick"},{"Carrots":"1 medium"},{"Garlic":"2 cloves chopped"},{"Minced Beef":"500g"},{"Tomato Puree":"1 tbls"},{"Chopped Tomatoes":"800g"},{"Honey":"1 tblsp "},{"Lasagne Sheets":"500g"},{"Creme Fraiche":"400ml"},{"Mozzarella Balls":"125g"},{"Parmesan Cheese":"50g"},{"Basil Leaves":"Topping"}]]}}';

    waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52844/in-progress');
      expect(storage).toBe(saveInLocalStorage);
    });
  });

  it('Testando se recipe favorite foi enviado para o localStorage e altera icon', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const fav = '[{"id":"53065","type":"meal","nationality":"Japanese","category":"Seafood","alcoholicOrNot":"","name":"Sushi","image":"https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg"}]';
    act(() => {
      history.push(' /meals/53065');
      localStorage.setItem('favoriteRecipes', fav);
    });

    const getFav = localStorage.getItem('favoriteRecipes');

    waitFor(async () => {
      expect(getFav).toBe(fav);
    });
  });

  it('Testando button favorite na rota Meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/meals/52804');

    const saveInFavorite = '[{"id":"52804","type":"meal","nationality":"Canadian","category":"Miscellaneous","alcoholicOrNot":"","name":"Poutine","image":"https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg"}]';

    const buttonFav = await screen.findByTestId('favorite-btn');

    await waitFor(() => {
      expect(buttonFav).toBeInTheDocument();
      expect(buttonFav).toHaveProperty('src', 'http://localhost/whiteHeartIcon.svg');
      expect(buttonFav).not.toHaveProperty('src', 'http://localhost/blackHeartIcon.svg');
    });

    await act(async () => {
      userEvent.click(screen.getByRole('img', {
        name: /favorites/i,
      }));
    });

    waitFor(() => {
      const getStorage = localStorage.getItem('favoriteRecipes');
      expect(getStorage).toBe(saveInFavorite);
      expect(buttonFav).toHaveProperty('src', 'http://localhost/blackHeartIcon.svg');
    });
  });

  // it('Testando copy do button share', async () => {
  //   const { history } = renderWithRouterAndRedux(<App />);

  //   history.push('/meals/52844');

  //   await waitFor(() => {
  //     expect(history.location.pathname).toBe('/meals/52844');
  //     expect(screen.getByRole('img', {
  //       name: /share/i,
  //     })).toBeInTheDocument();
  //   });

  //   userEvent.click(screen.getByRole('img', {
  //     name: /share/i,
  //   }));

  //   await waitFor(() => {
  //     expect(screen.getByText('Link copied!')).toBeInTheDocument();
  //   });
  // });

  it('Testando Fetch Recipes na rota Drinks', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([]),
    });

    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/drinks/14610');

    waitFor(() => {
      expect(history.location.pathname).toBe(DRINK);
      expect(globalThis.fetch).not.toBeCalled();
    });
  });

  it('Testando Fetch Recipes na rota Meals', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([]),
    });

    const { history } = renderWithRouterAndRedux(<App />);

    history.push(CORBA);

    waitFor(() => {
      expect(history.location.pathname).toBe(CORBA);
      expect(globalThis.fetch).not.toBeCalled();
    });
  });
});
