import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

import { AppState } from '~store';
import apiService from '~services/api.service';
import { todoActions } from '../actions';

export const todoChangeThunk =
  (id: number, text: string): ThunkAction<void, AppState, void, AnyAction> =>
  async (dispatch: ThunkDispatch<AppState, void, AnyAction>): Promise<void> => {
    try {
      dispatch(todoActions.todoChangeRequested({ id, text }));

      await apiService.put<void>(`/todos/${id}/change`, { text });

      dispatch(todoActions.todoChangeSuccessful(id));
    } catch (e) {
      const error = e as Error;
      dispatch(todoActions.todoChangeFailed({ error: error.message, id }));
      setTimeout(() => dispatch(todoActions.todoEmptifyError()), 2000);
    }
  };
