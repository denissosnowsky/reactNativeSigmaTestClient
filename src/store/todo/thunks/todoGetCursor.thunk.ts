import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

import { AppState } from '~store';
import apiService from '~services/api.service';
import { authActions } from '~store/auth';
import { todoActions } from '../actions';

export const todoGetCursorThunk =
  (): ThunkAction<void, AppState, void, AnyAction> =>
  async (
    dispatch: ThunkDispatch<AppState, void, AnyAction>,
    getState: () => AppState,
  ): Promise<void> => {
    const testMode = getState().auth.testMode;
    try {
      dispatch(todoActions.todoGetCoursorRequested());

      if (!testMode) {
        const cursor = await apiService.get<number>('/todos/cursor');
        dispatch(todoActions.todoGetCoursorSuccessful(cursor));
      }
    } catch (e) {
      const error = e as Error;
      if (error.message === 'Request failed with status code 401') {
        dispatch(authActions.authOutUserOn());
        dispatch(todoActions.todoResetAll());
      } else {
        dispatch(todoActions.todoGetCoursorFailed(error.message));
        setTimeout(() => dispatch(todoActions.todoEmptifyError()), 2000);
      }
    }
  };
