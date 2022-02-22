import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

import { AppState } from '~store';
import apiService from '~services/api.service';
import { authActions } from '../actions';

export const userChangePassThunk =
  (oldPass: string, newPass: string): ThunkAction<void, AppState, void, AnyAction> =>
  async (dispatch: ThunkDispatch<AppState, void, AnyAction>): Promise<void> => {
    try {
      dispatch(authActions.userPassChangeRequested());

      await apiService.put<void>('/users/pass', {
        oldPass,
        newPass,
      });

      dispatch(authActions.userPassChangeSuccess());
      setTimeout(() => dispatch(authActions.authEmptifySuccess()), 2000);
    } catch {
      dispatch(authActions.userPassChangeFailed());
      setTimeout(() => dispatch(authActions.authEmptifyError()), 2000);
    }
  };
