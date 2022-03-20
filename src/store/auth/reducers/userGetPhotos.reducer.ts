import { PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from '..';

export const userGetPhotosReducer = {
  userGetPhotosSuccess(
    state: AuthState,
    action: PayloadAction<Array<{ url: string; _id: string }>>,
  ) {
    state.avatars = action.payload;
  },
  userGetPhotosErase(state: AuthState) {
    state.avatars = null;
  },
  userGetPhotosFailed(state: AuthState, action: PayloadAction<string>) {
    state.error = action.payload;
  },
};
