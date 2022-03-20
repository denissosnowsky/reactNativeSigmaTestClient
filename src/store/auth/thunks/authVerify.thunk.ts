import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

import { AppState } from '~store';
import apiService from '~services/api.service';
import { UserDAO, UserDTO } from '~types/auth.types';
import { todoActions } from '~store/todo';
import { authActions } from '../actions';

export const authVerifyThunk =
  (): ThunkAction<void, AppState, void, AnyAction> =>
  async (dispatch: ThunkDispatch<AppState, void, AnyAction>): Promise<void> => {
    try {
      const userData = await apiService.post<UserDAO>('/auth/verify');
      await SecureStore.setItemAsync(Constants.manifest?.extra?.token, userData.token);

      dispatch(authActions.authUserSuccess(userData));
    } catch {
      dispatch(authActions.authOutUserOn());
      dispatch(todoActions.todoResetAll());
    }
  };
