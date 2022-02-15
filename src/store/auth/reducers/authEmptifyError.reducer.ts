import { AuthState } from '..';

export const authEmptifyErrorReducer = {
  authEmptifyError(state: AuthState) {
    state.error = '';
  },
};
