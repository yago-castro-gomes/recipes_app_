import React from 'react';
import { connect, useSelector } from 'react-redux';

function RecipesMeals() {
  const { recipesMeals } = useSelector((state) => state.recipeReduce);
  return (
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
          { console.log(index) }
        </div>
      ))}
    </div>
  );
}

export default connect()(RecipesMeals);
