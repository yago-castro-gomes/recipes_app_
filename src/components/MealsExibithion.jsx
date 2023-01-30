import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveRecipeMeals } from '../redux/actions';

const TWENTY = 12;
const FIVE = 5;

function MealsExibithion() {
  const { recipesMeals } = useSelector((state) => state.recipeReduce);
  const [initialData, setinitialData] = useState([]);
  const [saveCategory, setSaveCategory] = useState([]);
  const [saveInputCategory, setsaveInputCategory] = useState('');
  // const [saveElementsFiltred, setSaveElementsFiltred] = useState([]);
  const history = useHistory();
  const { pathname } = history.location;
  const dispatch = useDispatch();

  useEffect(() => {
    const checkPathApiMeals = async () => {
      if (pathname === '/meals') {
        const fetchApi = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const response = await fetchApi.json();
        const data = await response.meals;
        const sliceData = data.slice(0, TWENTY);
        dispatch(saveRecipeMeals(data));
        setinitialData(sliceData);
      }
    };
    checkPathApiMeals();
  }, [pathname, dispatch]);

  useEffect(() => {
    const checkCategoryMeals = async () => {
      if (pathname === '/meals') {
        const fetchApi = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const response = await fetchApi.json();
        const data = await response.meals;
        const sliceCategory = data.slice(0, FIVE);
        setSaveCategory(sliceCategory);
      }
    };

    checkCategoryMeals();
  }, [pathname]);

  useEffect(() => {
    const filterCategory = async () => {
      try {
        const fetchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${saveInputCategory}`);
        const response = await fetchApi.json();
        const data = await response.meals;
        dispatch(saveRecipeMeals(data));
        // setSaveElementsFiltred(data.slice(0, TWENTY));
      } catch (error) {
        console.log(error);
      }
    };
    filterCategory();
  }, [saveInputCategory, dispatch]);

  const clearFilters = () => {
    dispatch(saveRecipeMeals(initialData));
  };

  return (
    <div>
      <div>
        { saveCategory.map((category) => (
          <input
            data-testid={ `${category.strCategory}-category-filter` }
            key={ category.strCategory }
            value={ category.strCategory }
            onClick={ (e) => setsaveInputCategory(e.target.value) }
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
        { recipesMeals.map((meal, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ meal.idMeal }>
            <img
              src={ meal.strMealThumb }
              alt=""
              data-testid={ `${index}-card-img` }
              width="40%"
            />
            <div data-testid={ `${index}-card-name` }>
              { meal.strMeal }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default connect()(MealsExibithion);
