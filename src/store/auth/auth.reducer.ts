import { createSlice } from '@reduxjs/toolkit';

import {
  authErrorReducer,
  authUserReducer,
  authEmptifyErrorReducer,
  authOutUserReducer,
  authTestModeOnReducer,
  authTestModeOffReducer,
  userNameChangeReducer,
  userPhotoChangeReducer,
} from './reducers';

export type AuthState = {
  user: {
    name: string;
    photo: string;
    id: string;
  };
  tempUserPhoto: string;
  userNameEditing: string;
  userPhotoEditing: string;
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
  tempUserPhoto: '',
  userNameEditing: '',
  userPhotoEditing: '',
  isLogged: false,
  isLoading: false,
  isInitializing: true,
  error: '',
  testMode: false,
};

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    ...authUserReducer,
    ...authEmptifyErrorReducer,
    ...authErrorReducer,
    ...authOutUserReducer,
    ...authTestModeOnReducer,
    ...authTestModeOffReducer,
    ...userNameChangeReducer,
    ...userPhotoChangeReducer,
  },
});

export default counterSlice.reducer;
