import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage';

import { getFirebaseStorage } from '~services/firebase.service';
import apiService from '~services/api.service';
import { AppState } from '~store';
import { authActions } from '../actions';

export const userUploadPhotoThunk =
  (image: string): ThunkAction<void, AppState, void, AnyAction> =>
  async (
    dispatch: ThunkDispatch<AppState, void, AnyAction>,
    getState: () => AppState,
  ): Promise<void> => {
    const newPhotoName = `${Date.now()}.png`;
    const oldPhotoName = getState().auth.user.photo;
    let photoWasLoaded = false;
    let photoWasWritten = false;
    try {
      dispatch(authActions.userPhotoChangeRequested(image));

      const response = await fetch(image);
      const blob = await response.blob();
      const imageRef = ref(getFirebaseStorage(), newPhotoName);

      await uploadBytes(imageRef, blob);
      photoWasLoaded = true;

      await apiService.put<string>('/users/photo', {
        photoName: newPhotoName,
      });
      photoWasWritten = true;

      if (oldPhotoName) {
        await deleteObject(ref(getFirebaseStorage(), oldPhotoName));
      }
      dispatch(authActions.userPhotoChangeSuccess(newPhotoName));
    } catch {
      alert('vbbbb');
      if (photoWasLoaded && !photoWasWritten) {
        await deleteObject(ref(getFirebaseStorage(), newPhotoName));
        dispatch(authActions.userPhotoChangeFailed('Some error happend'));
        setTimeout(() => dispatch(authActions.authEmptifyError()), 2000);
      }
      if (!photoWasLoaded && !photoWasWritten) {
        dispatch(authActions.userPhotoChangeFailed('Some error happend'));
        setTimeout(() => dispatch(authActions.authEmptifyError()), 2000);
      }
      if (photoWasLoaded && photoWasWritten) {
        dispatch(authActions.userPhotoChangeSuccess(newPhotoName));
      }
    }
  };
