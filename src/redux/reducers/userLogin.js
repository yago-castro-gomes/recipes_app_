import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

export const loginReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN: return state;
  default: return state;
  }
};
