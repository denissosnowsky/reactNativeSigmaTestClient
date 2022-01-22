import { combineReducers } from '@reduxjs/toolkit';
import todoReducer from './todo/todo.reducer';

const reducer = combineReducers({
  todo: todoReducer,
});

export default reducer;
