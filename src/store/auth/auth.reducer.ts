import { createSlice } from '@reduxjs/toolkit';

import { UserDAO } from '~types/auth.types';

import {
  authErrorReducer,
  authUserReducer,
  authEmptifyErrorReducer,
  authOutUserReducer,
  authTestModeOnReducer,
  authTestModeOffReducer,
  userNameChangeReducer,
  userPhotoChangeReducer,
  authActivateLinkReducer,
} from './reducers';

export type AuthState = {
  user: Omit<UserDAO, 'token'>;
  tempUserPhoto: string;
  userNameEditing: string;
  userPhotoEditing: string;
  isLogged: boolean;
  isLoading: boolean;
  isInitializing: boolean;
  error: string;
  testMode: boolean;
  isActivationLinkLoading: boolean;
};

const initialState: AuthState = {
  user: {
    name: '',
    photo: '',
    id: '',
    email: '',
    isActivated: false,
    activationLink: '',
  },
  tempUserPhoto: '',
  userNameEditing: '',
  userPhotoEditing: '',
  isLogged: false,
  isLoading: false,
  isInitializing: true,
  error: '',
  testMode: false,
  isActivationLinkLoading: false,
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
    ...authActivateLinkReducer,
  },
});

export default counterSlice.reducer;
