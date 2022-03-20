import { Dispatch } from '@reduxjs/toolkit';

import { authThunks } from '~store/auth/thunks';
import { authActions } from '~store/auth';
import { checkEmailFormat } from '~utils/checkEmailFormat';

export const onSignUp = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  dispatch: Dispatch<any>,
) => {
  const setError = (messge: string) => {
    dispatch(authActions.authAddError(messge));
    setTimeout(() => dispatch(authActions.authEmptifyError()), 2000);
  };

  if (!email || !password || !name) {
    setError('Fill in all fields');
    return;
  }
  if (!checkEmailFormat(email)) {
    setError('Email format incorrect');
    return;
  }
  if (password !== confirmPassword) {
    setError('Password mismatch');
    return;
  }
  if (password.length < 6) {
    setError('Minimum password length - 6 symbols');
    return;
  }
  dispatch(
    authThunks.authSignUpThunk({
      email,
      password,
      name,
      photo: '',
    }),
  );
};
