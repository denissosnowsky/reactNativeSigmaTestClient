import { Dispatch } from '@reduxjs/toolkit';

import { authActions } from '~store/auth';
import { todoActions } from '~store/todo';

export const onTestMode = (dispatch: Dispatch<any>) => {
  dispatch(authActions.authTestModeOn());
  dispatch(todoActions.todoTestsAddOn());
};
