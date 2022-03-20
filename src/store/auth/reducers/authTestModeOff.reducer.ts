import { AuthState } from '..';

export const authTestModeOffReducer = {
  authTestModeOff(state: AuthState) {
    state.testMode = false;
  },
};
