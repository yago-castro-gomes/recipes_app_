import { combineReducers } from 'redux';
import { loginReduce } from './userLogin';

export const rootReducer = combineReducers({
  loginReduce,
});
