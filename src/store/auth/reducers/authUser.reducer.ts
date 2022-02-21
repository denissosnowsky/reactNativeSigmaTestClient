import { PayloadAction } from '@reduxjs/toolkit';

import { UserDAO } from '~types/auth.types';
import { AuthState } from '..';

export const authUserReducer = {
  authUserRequested(state: AuthState) {
    state.isLoading = true;
  },
  authUserSuccess(state: AuthState, action: PayloadAction<UserDAO>) {
    state.user = {
      name: action.payload.name,
      id: action.payload.id,
      photo: action.payload.photo,
      email: action.payload.email,
      isActivated: action.payload.isActivated,
      activationLink: action.payload.activationLink,
    };
    state.isLoading = false;
    state.isInitializing = false;
    state.isLogged = true;
  },
  authUserFailed(state: AuthState) {
    state.isLoading = false;
    state.isInitializing = false;
    state.error = 'Authentication error';
  },
};
