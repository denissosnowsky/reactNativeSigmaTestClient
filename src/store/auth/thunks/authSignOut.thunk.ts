import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

import { AppState } from '~store';
import { todoActions } from '~store/todo';
import { authActions } from '../actions';

export const authSignOutThunk =
  (): ThunkAction<void, AppState, void, AnyAction> =>
  async (dispatch: ThunkDispatch<AppState, void, AnyAction>): Promise<void> => {
    await SecureStore.deleteItemAsync(Constants.manifest?.extra?.token);
    dispatch(authActions.authOutUserOn());
    dispatch(todoActions.todoResetAll());
  };
