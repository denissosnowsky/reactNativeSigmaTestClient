import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

import { TodoDTO } from '~types/todo.types';
import { AppState } from '~store';
import apiService from '~services/api.service';
import { todoActions } from '../actions';

export const todoDeleteThunk =
  (todos: Array<TodoDTO>): ThunkAction<void, AppState, void, AnyAction> =>
  async (dispatch: ThunkDispatch<AppState, void, AnyAction>): Promise<void> => {
    try {
      const idsList = todos.map((todo) => todo.id);
      dispatch(todoActions.todoDeleteRequested(idsList));

      await apiService.delete<void>(`/todos/delete?${idsList.map((id) => `id=${id}&`).join('')}`);

      dispatch(todoActions.todoDeleteSuccessful(idsList));
    } catch (e) {
      const error = e as Error;
      dispatch(todoActions.todoDeleteFailed(error.message));
      setTimeout(() => dispatch(todoActions.todoEmptifyError()), 2000);
    }
  };
