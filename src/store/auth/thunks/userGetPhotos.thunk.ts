import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

import apiService from '~services/api.service';
import { AppState } from '~store';
import { authActions } from '../actions';

export const userGetPhotosThunk =
  (): ThunkAction<void, AppState, void, AnyAction> =>
  async (dispatch: ThunkDispatch<AppState, void, AnyAction>): Promise<void> => {
    try {
      const avatars = await apiService.get<{ url: string; _id: string }[]>('/avatars');

      dispatch(authActions.userGetPhotosSuccess(avatars));
    } catch {
      dispatch(authActions.userGetPhotosFailed('Some error happend'));
      setTimeout(() => dispatch(authActions.authEmptifyError()), 2000);
    }
  };
