import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { saveRecipeDrinks } from '../redux/actions';
import '../styles/recipes.css';
import Loading from './Loading';

const FIVE = 5;
const TWENTY = 12;

function DrinkExibithion() {
  const { recipesDrinks } = useSelector((state) => state.recipeReduce);
  const [initialData, setinitialData] = useState([]);
  const [saveCategory, setSaveCategory] = useState([]);
  const [saveInputCategory, setsaveInputCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;
  const dispatch = useDispatch();

  useEffect(() => {
    const checkPathApiDrinks = async () => {
      if (pathname === '/drinks') {
        setLoading(true);
        const fetchApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const response = await fetchApi.json();
        const data = await response.drinks;
        const sliceData = data.slice(0, TWENTY);
        dispatch(saveRecipeDrinks(data));
        setLoading(false);
        setinitialData(sliceData);
      }
    };
    checkPathApiDrinks();
  }, [pathname, dispatch]);

  useEffect(() => {
    const checkCategoryDrinks = async () => {
      if (pathname === '/drinks') {
        setLoading(true);
        const fetchApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const response = await fetchApi.json();
        const data = await response.drinks;
        const sliceCategory = data.slice(0, FIVE);
        setSaveCategory(sliceCategory);
        setLoading(false);
      }
    };
    checkCategoryDrinks();
  }, [pathname]);

  useEffect(() => {
    const filterCategory = async () => {
      if (saveInputCategory !== '') {
        try {
          setLoading(true);
          const fetchApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${saveInputCategory}`);
          const response = await fetchApi.json();
          const data = await response.drinks;
          dispatch(saveRecipeDrinks(data));
          setLoading(false);
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
            id="btn-all-drinks"
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
                id={ category.strCategory.replace(' ', '-')
                  .replace('/', '').replace(' ', '') }
              />
              <div>{category.strCategory}</div>
            </label>
          </div>
        ))}
      </div>
      { loading ? <Loading /> : (
        <div className="itens-content">
          { recipesDrinks.map((drink, index) => (
            <div key={ drink.idDrink }>
              <div className="card-content">
                <Link to={ `/drinks/${drink.idDrink}` }>
                  <div data-testid={ `${index}-recipe-card` } className="content-image">
                    <img
                      src={ drink.strDrinkThumb }
                      alt=""
                      data-testid={ `${index}-card-img` }
                      width="40%"
                      className="image-card"
                    />
                  </div>
                  <div data-testid={ `${index}-card-name` } className="name-card">
                    { drink.strDrink }
                  </div>
                </Link>
              </div>
            </div>

          ))}
        </div>)}
    </div>
  );
}
export default connect()(DrinkExibithion);
