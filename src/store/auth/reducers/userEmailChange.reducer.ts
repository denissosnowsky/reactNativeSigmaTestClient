import { PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '..';

export const userEmailChangeReducer = {
  userEmailChangeRequested(state: AuthState, action: PayloadAction<string>) {
    state.isLoading = true;
    state.userEmailEditing = state.user.email;
    state.user = { ...state.user, email: action.payload };
  },
  userEmailChangeSuccess(state: AuthState) {
    state.userEmailEditing = '';
    state.isLoading = false;
    state.successAlert = 'Email was changed. Confirm the email via link we sent you';
  },
  userEmailChangeFailed(state: AuthState) {
    state.isLoading = false;
    state.error = "Error: email wasn't changed";
    state.user = { ...state.user, email: state.userEmailEditing };
    state.userEmailEditing = '';
  },
};
