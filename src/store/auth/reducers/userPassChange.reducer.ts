import constants from '~global/constants';
import { AuthState } from '..';

export const userPassChangeReducer = {
  userPassChangeRequested(state: AuthState) {
    state.isChangePasswordLoading = true;
  },
  userPassChangeSuccess(state: AuthState) {
    state.isChangePasswordLoading = false;
    state.successAlert = 'Please, confirm password change via the link we sent on your email';
  },
  userPassChangeFailed(state: AuthState) {
    state.isChangePasswordLoading = false;
    state.error = constants.CHANGE_PASS_ERROR;
  },
};
