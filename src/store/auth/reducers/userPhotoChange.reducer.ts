import { PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from '..';

export const userPhotoChangeReducer = {
  userPhotoChangeRequested(state: AuthState, action: PayloadAction<string>) {
    state.userPhotoEditing = state.user.photo;
    state.tempUserPhoto = action.payload;
    state.user = { ...state.user, photo: '' };
  },
  userPhotoChangeSuccess(state: AuthState, action: PayloadAction<string>) {
    state.userPhotoEditing = '';
    state.user = { ...state.user, photo: action.payload };
  },
  userPhotoChangeFailed(state: AuthState, action: PayloadAction<string>) {
    state.error = action.payload;
    state.user = { ...state.user, photo: state.userPhotoEditing };
    state.userPhotoEditing = '';
    state.tempUserPhoto = '';
  },
};
