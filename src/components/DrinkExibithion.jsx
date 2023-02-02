import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { saveRecipeDrinks } from '../redux/actions';

const FIVE = 5;
const TWENTY = 12;

function DrinkExibithion() {
  const { recipesDrinks } = useSelector((state) => state.recipeReduce);
  const [initialData, setinitialData] = useState([]);
  const [saveCategory, setSaveCategory] = useState([]);
  const [saveInputCategory, setsaveInputCategory] = useState('');
  const history = useHistory();
  const { pathname } = history.location;
  const dispatch = useDispatch();

  useEffect(() => {
    const checkPathApiDrinks = async () => {
      if (pathname === '/drinks') {
        const fetchApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const response = await fetchApi.json();
        const data = await response.drinks;
        const sliceData = data.slice(0, TWENTY);
        dispatch(saveRecipeDrinks(data));
        setinitialData(sliceData);
      }
    };
    checkPathApiDrinks();
  }, [pathname, dispatch]);

  useEffect(() => {
    const checkCategoryDrinks = async () => {
      if (pathname === '/drinks') {
        const fetchApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const response = await fetchApi.json();
        const data = await response.drinks;
        const sliceCategory = data.slice(0, FIVE);
        setSaveCategory(sliceCategory);
        console.log(sliceCategory);
      }
    };
    checkCategoryDrinks();
  }, [pathname]);

  useEffect(() => {
    const filterCategory = async () => {
      if (saveInputCategory !== '') {
        try {
          const fetchApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${saveInputCategory}`);
          console.log(fetchApi);
          if (fetchApi.ok) {
            const response = await fetchApi.json();
            const data = await response.drinks;
            dispatch(saveRecipeDrinks(data));
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    filterCategory();
  }, [saveInputCategory, dispatch]);

  const clearFilters = () => {
    dispatch(saveRecipeDrinks(initialData));
  };

  const handleToggle = (e) => {
    saveCategory.map((cat) => {
      if (saveInputCategory === cat.strCategory) {
        dispatch(saveRecipeDrinks(initialData));
        console.log(cat.strCategory);
        return setsaveInputCategory('');
      }
      return setsaveInputCategory(e);
    });
  };

  return (
    <div>
      <div>
        { saveCategory.map((category) => (
          <input
            data-testid={ `${category.strCategory}-category-filter` }
            key={ category.strCategory }
            value={ category.strCategory }
            onClick={ (e) => handleToggle(e.target.value) }
            type="button"
          />
        ))}
      </div>
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ clearFilters }
      >
        All
      </button>

      <div>
        { recipesDrinks.map((drink, index) => (
          <div key={ drink.idDrink }>
            <Link to={ `/drinks/${drink.idDrink}` }>
              <div data-testid={ `${index}-recipe-card` }>
                <img
                  src={ drink.strDrinkThumb }
                  alt=""
                  data-testid={ `${index}-card-img` }
                  width="40%"
                />
                <div data-testid={ `${index}-card-name` }>
                  { drink.strDrink }
                </div>
              </div>
            </Link>
          </div>

        ))}
      </div>
    </div>
  );
}
export default connect()(DrinkExibithion);
