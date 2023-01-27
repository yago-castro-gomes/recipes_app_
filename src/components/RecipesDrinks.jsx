import React from 'react';
import { connect, useSelector } from 'react-redux';

function RecipesDrinks() {
  const { recipesDrinks } = useSelector((state) => state.recipeReduce);
  return (
    <div>
      { recipesDrinks.map((drink, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
          <img
            src={ drink.strDrinkThumb }
            alt=""
            data-testid={ `${index}-card-img` }
            width="40%"
          />
          <div data-testid={ `${index}-card-name` }>
            { drink.strDrink }
          </div>
          { console.log(index) }
        </div>
      ))}
    </div>
  );
}

export default connect()(RecipesDrinks);
