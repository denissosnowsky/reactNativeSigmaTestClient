import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

import { AppState } from '~store';
import apiService from '~services/api.service';
import { ImportantEnum } from '~types/todo.types';
import { todoActions } from '../actions';

export const todoChangeThunk =
  (
    id: number,
    text: string,
    priority: ImportantEnum,
  ): ThunkAction<void, AppState, void, AnyAction> =>
  async (dispatch: ThunkDispatch<AppState, void, AnyAction>): Promise<void> => {
    try {
      dispatch(todoActions.todoChangeRequested({ id, text, priority }));

      await apiService.put<void>(`/todos/${id}/change`, { text, priority });

      dispatch(todoActions.todoChangeSuccessful(id));
    } catch (e) {
      const error = e as Error;
      dispatch(todoActions.todoChangeFailed({ error: error.message, id }));
      setTimeout(() => dispatch(todoActions.todoEmptifyError()), 2000);
    }
  };
