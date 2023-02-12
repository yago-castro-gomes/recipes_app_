import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { saveRecipeMeals } from '../redux/actions';
import '../styles/recipes.css';
import Loading from './Loading';

const TWENTY = 12;
const FIVE = 5;

function MealsExibithion() {
  const { recipesMeals } = useSelector((state) => state.recipeReduce);
  const [initialData, setinitialData] = useState([]);
  const [saveCategory, setSaveCategory] = useState([]);
  const [saveInputCategory, setsaveInputCategory] = useState('');
  const [loading, setLoading] = useState(false);
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
        setLoading(true);
        const fetchApi = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const response = await fetchApi.json();
        const data = await response.meals;
        const sliceCategory = data.slice(0, FIVE);
        setSaveCategory(sliceCategory);
        setLoading(false);
      }
    };

    checkCategoryMeals();
  }, [pathname]);

  useEffect(() => {
    const filterCategory = async () => {
      if (saveInputCategory !== '') {
        try {
          setLoading(true);
          const fetchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${saveInputCategory}`);
          const response = await fetchApi.json();
          const data = await response.meals;
          dispatch(saveRecipeMeals(data));
          setLoading(false);
        // setSaveElementsFiltred(data.slice(0, TWENTY));
        } catch (error) {
          console.log(error);
        }
      }
    };
    filterCategory();
  }, [saveInputCategory, dispatch]);

  const clearFilters = () => {
    dispatch(saveRecipeMeals(initialData));
  };

  const handleToggle = (e) => {
    saveCategory.map((cat) => {
      if (saveInputCategory === cat.strCategory) {
        dispatch(saveRecipeMeals(initialData));
        return setsaveInputCategory('');
      }
      return setsaveInputCategory(e);
    });
  };

  return (
    <div>
      <div className="category-content">
        <div>
          {/* eslint-disable-next-line */}
          <button
            data-testid="All-category-filter"
            type="button"
            onClick={ clearFilters }
            className="categoryBtn"
            id="all-btn"
          />
          <div>All</div>
        </div>
        { saveCategory.map((category) => (
          <div key={ category.strCategory }>
            <label htmlFor={ category.strCategory }>
              {/* eslint-disable-next-line */}
              <button
                data-testid={ `${category.strCategory}-category-filter` }
                className="categoryBtn"
                value={ category.strCategory }
                onClick={ (e) => handleToggle(e.target.value) }
                type="button"
                id={ category.strCategory }
              />
              <div>
                { category.strCategory }
              </div>
            </label>
          </div>
        ))}
      </div>
      { loading ? <Loading /> : (
        <div className="itens-content">
          { recipesMeals.map((meal, index) => (
            <div key={ meal.idMeal }>
              <div className="card-content">
                <Link to={ `/meals/${meal.idMeal}` }>
                  <div data-testid={ `${index}-recipe-card` } className="content-image">
                    <img
                      src={ meal.strMealThumb }
                      alt=""
                      data-testid={ `${index}-card-img` }
                      width="40%"
                      className="image-card"
                    />
                  </div>
                  <div data-testid={ `${index}-card-name` } className="name-card">
                    { meal.strMeal }
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>)}
    </div>
  );
}

export default connect()(MealsExibithion);
