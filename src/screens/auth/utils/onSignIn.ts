import { Dispatch } from '@reduxjs/toolkit';

import { authThunks } from '~store/auth/thunks';
import { authActions } from '~store/auth';

export const onSignIn = (email: string, password: string, dispatch: Dispatch<any>) => {
  if (email && password) {
    dispatch(
      authThunks.authSignInThunk({
        email,
        password,
      }),
    );
  } else {
    dispatch(authActions.authAddError('Enter all fields'));
    setTimeout(() => dispatch(authActions.authEmptifyError()), 2000);
  }
};
