import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

import apiService from '~services/api.service';
import { AppState } from '~store';
import { authActions } from '../actions';

export const userUploadPhotoThunk =
  (image: string): ThunkAction<void, AppState, void, AnyAction> =>
  async (
    dispatch: ThunkDispatch<AppState, void, AnyAction>,
    getState: () => AppState,
  ): Promise<void> => {
    const avatars = getState().auth.avatars!;
    const imageUrl = avatars.find((avatar) => avatar._id === image)!.url;
    try {
      dispatch(authActions.userPhotoChangeRequested(imageUrl));

      await apiService.put<string>('/users/photo', {
        photoName: imageUrl,
      });

      dispatch(authActions.userPhotoChangeSuccess(imageUrl));
    } catch {
      dispatch(authActions.userPhotoChangeFailed('Some error happend'));
      setTimeout(() => dispatch(authActions.authEmptifyError()), 2000);
    }
  };
