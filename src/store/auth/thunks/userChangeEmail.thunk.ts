import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

import { AppState } from '~store';
import apiService from '~services/api.service';
import { authActions } from '../actions';

export const userChangeEmailThunk =
  (newEmail: string): ThunkAction<void, AppState, void, AnyAction> =>
  async (dispatch: ThunkDispatch<AppState, void, AnyAction>): Promise<void> => {
    try {
      dispatch(authActions.userEmailChangeRequested(newEmail));

      await apiService.put<void>('/users/email', {
        email: newEmail,
      });

      dispatch(authActions.userEmailChangeSuccess());
      setTimeout(() => dispatch(authActions.authEmptifySuccess()), 4000);
    } catch {
      dispatch(authActions.userEmailChangeFailed());
      setTimeout(() => dispatch(authActions.authEmptifyError()), 2000);
    }
  };
