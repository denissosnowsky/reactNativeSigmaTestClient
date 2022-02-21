import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

import { AppState } from '~store';
import apiService from '~services/api.service';
import { UserDAO, UserDTO } from '~types/auth.types';
import { authActions } from '../actions';

export const authSendActivationLinkThunk =
  (): ThunkAction<void, AppState, void, AnyAction> =>
  async (
    dispatch: ThunkDispatch<AppState, void, AnyAction>,
    getState: () => AppState,
  ): Promise<void> => {
    try {
      dispatch(authActions.authActivateLinkRequested());

      await apiService.post<UserDAO>('/auth/sendEmail', {
        link: getState().auth.user.activationLink,
        email: getState().auth.user.email,
      });

      dispatch(authActions.authActivateLinkSuccess());
    } catch {
      dispatch(authActions.authActivateLinkFailed());
    }
  };
