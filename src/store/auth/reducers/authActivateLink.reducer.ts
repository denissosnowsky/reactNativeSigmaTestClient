import { AuthState } from '..';

export const authActivateLinkReducer = {
  authActivateLinkRequested(state: AuthState) {
    state.isActivationLinkLoading = true;
  },
  authActivateLinkSuccess(state: AuthState) {
    state.isActivationLinkLoading = false;
  },
  authActivateLinkFailed(state: AuthState) {
    state.isActivationLinkLoading = false;
  },
};
