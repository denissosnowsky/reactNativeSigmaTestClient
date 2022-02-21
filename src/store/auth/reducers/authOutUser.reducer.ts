import { AuthState } from '..';

export const authOutUserReducer = {
  authOutUserOn(state: AuthState) {
    state.isLogged = false;
    state.isInitializing = false;
    state.user = {
      name: '',
      photo: '',
      id: '',
      email: '',
      isActivated: false,
      activationLink: '',
    };
  },
};
