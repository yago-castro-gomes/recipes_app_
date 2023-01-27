import { combineReducers } from 'redux';
import { loginReduce } from './userLogin';
import { recipeReduce } from './recipes';

export const rootReducer = combineReducers({
  loginReduce,
  recipeReduce,
});
