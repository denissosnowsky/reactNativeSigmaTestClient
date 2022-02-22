import { PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from '..';

export const userPassChangeReducer = {
  userPassChangeRequested(state: AuthState) {
    state.isLoading = true;
  },
  userPassChangeSuccess(state: AuthState) {
    state.isLoading = false;
    state.successAlert = 'Password was changed';
  },
  userPassChangeFailed(state: AuthState) {
    state.isLoading = false;
    state.error = "Error: password wasn't changed";
  },
};
