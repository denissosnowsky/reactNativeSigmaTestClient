import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

import { AppState } from '~store';
import apiService from '~services/api.service';
import { authActions } from '~store/auth';
import { ImportantEnum } from '~types/todo.types';
import { todoActions } from '../actions';

export const todoChangeThunk =
  (
    id: number,
    text: string,
    priority: ImportantEnum,
  ): ThunkAction<void, AppState, void, AnyAction> =>
  async (
    dispatch: ThunkDispatch<AppState, void, AnyAction>,
    getState: () => AppState,
  ): Promise<void> => {
    const testMode = getState().auth.testMode;
    try {
      dispatch(todoActions.todoChangeRequested({ id, text, priority }));

      if (!testMode) {
        await apiService.put<void>(`/todos/${id}/change`, { text, priority });
      }

      dispatch(todoActions.todoChangeSuccessful(id));
    } catch (e) {
      const error = e as Error;
      if (error.message === 'Request failed with status code 401') {
        dispatch(authActions.authOutUserOn());
        dispatch(todoActions.todoResetAll());
      } else {
        dispatch(todoActions.todoChangeFailed({ error: error.message, id }));
        setTimeout(() => dispatch(todoActions.todoEmptifyError()), 2000);
      }
    }
  };
