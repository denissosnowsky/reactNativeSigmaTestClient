import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

import { AppState } from '~store';
import apiService from '~services/api.service';
import { authActions } from '../actions';

export const authNewPasswordThunk =
  (email: string): ThunkAction<void, AppState, void, AnyAction> =>
  async (dispatch: ThunkDispatch<AppState, void, AnyAction>): Promise<void> => {
    try {
      dispatch(authActions.authResetPasswordRequested());

      await apiService.post<void>('/auth/sendReset', {
        email,
      });

      dispatch(authActions.authResetPasswordSuccess());
      setTimeout(() => dispatch(authActions.authEmptifySuccess()), 2000);
    } catch {
      dispatch(authActions.authResetPasswordFailed());
      setTimeout(() => dispatch(authActions.authEmptifyError()), 2000);
    }
  };
