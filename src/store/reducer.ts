import { combineReducers } from '@reduxjs/toolkit';
import todoReducer from './todo/todo.reducer';
import themeReducer from './theme/theme.reducer';
import authReducer from './auth/auth.reducer';

const reducer = combineReducers({
  todo: todoReducer,
  theme: themeReducer,
  auth: authReducer,
});

export default reducer;
