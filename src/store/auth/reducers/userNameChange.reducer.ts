import { PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from '..';

export const userNameChangeReducer = {
  userNameChangeRequested(state: AuthState, action: PayloadAction<string>) {
    state.userNameEditing = state.user.name;
    state.user = { ...state.user, name: action.payload };
  },
  userNameChangeSuccess(state: AuthState) {
    state.userNameEditing = '';
  },
  userNameChangeFailed(state: AuthState, action: PayloadAction<string>) {
    state.error = action.payload;
    state.user = { ...state.user, name: state.userNameEditing };
    state.userNameEditing = '';
  },
};
