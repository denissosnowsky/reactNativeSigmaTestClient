import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

import { TodoDTO } from '~types/todo.types';
import { AppState } from '~store';
import { authActions } from '~store/auth';
import apiService from '~services/api.service';
import { todoActions } from '../actions';

export const todosFetchThunk =
  (): ThunkAction<void, AppState, void, AnyAction> =>
  async (
    dispatch: ThunkDispatch<AppState, void, AnyAction>,
    getState: () => AppState,
  ): Promise<void> => {
    const testMode = getState().auth.testMode;
    try {
      if (!testMode) {
        dispatch(todoActions.todosFetchRequested());

        const data = await apiService.get<{
          todos: Array<TodoDTO>;
          count: number;
        }>('/todos', {
          limit: getState().todo.limit + getState().todo.deletedTodosBeforeNewPage,
          skip: getState().todo.skip - getState().todo.deletedTodosBeforeNewPage,
          complete: getState().todo.completenceFilterMode,
          important: getState().todo.importantFilterMode,
        });
        dispatch(todoActions.todosFetchSuccessful({ todos: data.todos, count: data.count }));
      }
    } catch (e) {
      const error = e as Error;
      if (error.message === 'Request failed with status code 401') {
        dispatch(authActions.authOutUserOn());
        dispatch(todoActions.todoResetAll());
      } else {
        dispatch(todoActions.todosFetchFailed(error.message));
        setTimeout(() => dispatch(todoActions.todoEmptifyError()), 2000);
      }
    }
  };
