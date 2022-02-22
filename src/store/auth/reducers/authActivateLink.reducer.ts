import { AuthState } from '..';

export const authActivateLinkReducer = {
  authActivateLinkRequested(state: AuthState) {
    state.isActivationLinkLoading = true;
  },
  authActivateLinkSuccess(state: AuthState) {
    state.isActivationLinkLoading = false;
    state.successAlert = 'Link was sent';
  },
  authActivateLinkFailed(state: AuthState) {
    state.isActivationLinkLoading = false;
    state.error = "Error: link wasn't sent";
  },
};
