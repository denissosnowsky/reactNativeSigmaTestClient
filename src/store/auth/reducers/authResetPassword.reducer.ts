import { AuthState } from '..';

export const authResetPasswordReducer = {
  authResetPasswordRequested(state: AuthState) {
    state.isResetPasswordLoading = true;
  },
  authResetPasswordSuccess(state: AuthState) {
    state.isResetPasswordLoading = false;
    state.successAlert = 'Password was sent';
  },
  authResetPasswordFailed(state: AuthState) {
    state.isResetPasswordLoading = false;
    state.error = "Error: password wasn't sent";
  },
};
