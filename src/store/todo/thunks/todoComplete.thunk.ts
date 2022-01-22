import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

import { AppState } from '~store';
import apiService from '~services/api.service';
import { todoActions } from '../actions';

export const todoCompleteThunk =
  (id: number): ThunkAction<void, AppState, void, AnyAction> =>
  async (dispatch: ThunkDispatch<AppState, void, AnyAction>): Promise<void> => {
    try {
      dispatch(todoActions.todoCompleteRequested(id));

      await apiService.put<void>(`/todos/${id}`);

      dispatch(todoActions.todoCompleteSuccessful(id));
    } catch (e) {
      const error = e as Error;
      dispatch(todoActions.todoCompleteFailed({ error: error.message, id }));
      setTimeout(() => dispatch(todoActions.todoEmptifyError()), 2000);
    }
  };
