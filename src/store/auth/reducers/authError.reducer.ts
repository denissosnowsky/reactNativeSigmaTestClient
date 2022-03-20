import { PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from '..';

export const authErrorReducer = {
  authAddError(state: AuthState, action: PayloadAction<string>) {
    state.error = action.payload;
  },
};
