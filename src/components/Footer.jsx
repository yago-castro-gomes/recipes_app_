import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/footer.css';

export default function Footer() {
  const history = useHistory();

  const handDrinks = () => {
    history.push('/drinks');
  };
  const handMeals = () => {
    history.push('/meals');
  };

  return (
    <div>
      <div data-testid="footer" className="footer">
        <div>
          <button
            type="button"
            onClick={ handDrinks }
            className="footer-drinks"
          >
            <img
              src={ drinkIcon }
              alt="drinks"
              data-testid="drinks-bottom-btn"
            />
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={ handMeals }
          >
            <img
              src={ mealIcon }
              alt="meal"
              data-testid="meals-bottom-btn"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
