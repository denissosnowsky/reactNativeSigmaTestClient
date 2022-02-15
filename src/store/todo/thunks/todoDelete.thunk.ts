import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

import { TodoDTO } from '~types/todo.types';
import { AppState } from '~store';
import apiService from '~services/api.service';
import { authActions } from '~store/auth';
import { todoActions } from '../actions';

export const todoDeleteThunk =
  (todos: Array<TodoDTO>): ThunkAction<void, AppState, void, AnyAction> =>
  async (
    dispatch: ThunkDispatch<AppState, void, AnyAction>,
    getState: () => AppState,
  ): Promise<void> => {
    const idsList = todos.map((todo) => todo.id);
    const testMode = getState().auth.testMode;
    try {
      dispatch(todoActions.todoDeleteRequested(idsList));

      if (!testMode) {
        await apiService.delete<void>(`/todos/delete?${idsList.map((id) => `id=${id}&`).join('')}`);
        dispatch(todoActions.todoDeleteSuccessful(idsList));
      }
    } catch (e) {
      const error = e as Error;
      if (error.message === 'Request failed with status code 401') {
        dispatch(authActions.authOutUserOn());
        dispatch(todoActions.todoResetAll());
      } else {
        dispatch(todoActions.todoDeleteFailed({ error: error.message, ids: idsList }));
        setTimeout(() => dispatch(todoActions.todoEmptifyError()), 2000);
      }
    }
  };
