import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

import { AppState } from '~store';
import apiService from '~services/api.service';
import { authActions } from '../actions';

export const userChangeNameThunk =
  (name: string): ThunkAction<void, AppState, void, AnyAction> =>
  async (dispatch: ThunkDispatch<AppState, void, AnyAction>): Promise<void> => {
    try {
      dispatch(authActions.userNameChangeRequested(name));

      await apiService.put<string>('/users/name', {
        name,
      });

      dispatch(authActions.userNameChangeSuccess());
    } catch {
      dispatch(authActions.userNameChangeFailed('Some error happend'));
      setTimeout(() => dispatch(authActions.authEmptifyError()), 2000);
    }
  };
