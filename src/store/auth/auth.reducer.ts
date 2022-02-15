import { createSlice } from '@reduxjs/toolkit';

import {
  authErrorReducer,
  authUserReducer,
  authEmptifyErrorReducer,
  authOutUserReducer,
  authTestModeOnReducer,
  authTestModeOffReducer,
} from './reducers';

export type AuthState = {
  user: {
    name: string;
    photo: string;
    id: string;
  };
  isLogged: boolean;
  isLoading: boolean;
  isInitializing: boolean;
  error: string;
  testMode: boolean;
};

const initialState: AuthState = {
  user: {
    name: '',
    photo: '',
    id: '',
  },
  isLogged: false,
  isLoading: false,
  isInitializing: true,
  error: '',
  testMode: false,
};

export const counterSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    ...authUserReducer,
    ...authEmptifyErrorReducer,
    ...authErrorReducer,
    ...authOutUserReducer,
    ...authTestModeOnReducer,
    ...authTestModeOffReducer,
  },
});

export default counterSlice.reducer;
