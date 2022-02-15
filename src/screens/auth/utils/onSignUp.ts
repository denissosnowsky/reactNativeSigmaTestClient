import { Dispatch } from '@reduxjs/toolkit';

import { authThunks } from '~store/auth/thunks';
import { authActions } from '~store/auth';

export const onSignUp = (
  name: string,
  email: string,
  password: string,
  dispatch: Dispatch<any>,
) => {
  if (email && password && name) {
    dispatch(
      authThunks.authSignUpThunk({
        email,
        password,
        name,
        photo: '',
      }),
    );
  } else {
    dispatch(authActions.authAddError('Enter all fields'));
    setTimeout(() => dispatch(authActions.authEmptifyError()), 2000);
  }
};
