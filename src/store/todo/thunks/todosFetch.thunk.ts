import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

import { TodoDTO } from '~types/todo.types';
import { AppState } from '~store';
import apiService from '~services/api.service';
import { todoActions } from '../actions';

export const todosFetchThunk =
  (): ThunkAction<void, AppState, void, AnyAction> =>
  async (
    dispatch: ThunkDispatch<AppState, void, AnyAction>,
    getState: () => AppState,
  ): Promise<void> => {
    try {
      dispatch(todoActions.todosFetchRequested());

      const data = await apiService.get<{
        todos: Array<TodoDTO>;
        count: number;
      }>('/todos', {
        limit: getState().todo.limit + getState().todo.deletedTodosBeforeNewPage,
        skip: getState().todo.skip - getState().todo.deletedTodosBeforeNewPage,
      });

      dispatch(todoActions.todosFetchSuccessful({ todos: data.todos, count: data.count }));
    } catch (e) {
      const error = e as Error;
      dispatch(todoActions.todosFetchFailed(error.message));
      setTimeout(() => dispatch(todoActions.todoEmptifyError()), 2000);
    }
  };
