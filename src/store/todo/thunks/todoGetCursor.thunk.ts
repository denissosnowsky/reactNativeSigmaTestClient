import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

import { AppState } from '~store';
import apiService from '~services/api.service';
import { todoActions } from '../actions';

export const todoGetCursorThunk =
  (): ThunkAction<void, AppState, void, AnyAction> =>
  async (dispatch: ThunkDispatch<AppState, void, AnyAction>): Promise<void> => {
    try {
      dispatch(todoActions.todoGetCoursorRequested());

      const cursor = await apiService.get<number>('/todos/cursor');

      dispatch(todoActions.todoGetCoursorSuccessful(cursor));
    } catch (e) {
      const error = e as Error;
      dispatch(todoActions.todoGetCoursorFailed(error.message));
      setTimeout(() => dispatch(todoActions.todoEmptifyError()), 2000);
    }
  };
