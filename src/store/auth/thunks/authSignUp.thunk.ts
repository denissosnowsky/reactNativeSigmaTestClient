import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

import { AppState } from '~store';
import apiService from '~services/api.service';
import { UserDAO, UserDTO } from '~types/auth.types';
import { authActions } from '../actions';

export const authSignUpThunk =
  (user: UserDTO): ThunkAction<void, AppState, void, AnyAction> =>
  async (dispatch: ThunkDispatch<AppState, void, AnyAction>): Promise<void> => {
    try {
      dispatch(authActions.authUserRequested());

      const userData = await apiService.post<UserDAO>('/auth/signup', {
        ...user,
      });
      await SecureStore.setItemAsync(Constants.manifest?.extra?.token, userData.token);

      dispatch(authActions.authUserSuccess(userData));
    } catch {
      dispatch(authActions.authUserFailed());
      setTimeout(() => dispatch(authActions.authEmptifyError()), 2000);
    }
  };
