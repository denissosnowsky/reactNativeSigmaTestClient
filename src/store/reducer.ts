import { combineReducers } from '@reduxjs/toolkit';
import todoReducer from './todo/todo.reducer';
import themeReducer from './theme/theme.reducer';

const reducer = combineReducers({
  todo: todoReducer,
  theme: themeReducer,
});

export default reducer;
