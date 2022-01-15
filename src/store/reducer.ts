import { combineReducers } from '@reduxjs/toolkit';
import { todoReducer } from './todo';

const reducer = combineReducers({
  todo: todoReducer,
});

export default reducer;
