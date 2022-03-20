import { AuthState } from '..';

export const authEmptifySuccessReducer = {
  authEmptifySuccess(state: AuthState) {
    state.successAlert = '';
  },
};
