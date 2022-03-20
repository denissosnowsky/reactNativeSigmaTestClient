import { AuthState } from '..';

export const authTestModeOnReducer = {
  authTestModeOn(state: AuthState) {
    state.testMode = true;
  },
};
