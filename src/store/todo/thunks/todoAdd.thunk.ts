import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

import { ImportantEnum, TodoDAO, TodoDTO } from '~types/todo.types';
import { AppState } from '~store';
import { authActions } from '~store/auth';
import apiService from '~services/api.service';
import { todoActions } from '../actions';

export const todoAddThunk =
  (todo: TodoDAO): ThunkAction<void, AppState, void, AnyAction> =>
  async (
    dispatch: ThunkDispatch<AppState, void, AnyAction>,
    getState: () => AppState,
  ): Promise<void> => {
    const newId = getState().todo.cursor + 1;
    const testMode = getState().auth.testMode;
    try {
      dispatch(
        todoActions.todoAddRequested({
          ...todo,
          id: newId,
          completed: false,
          important: ImportantEnum.DEFAULT,
        }),
      );

      if (!testMode) {
        const newTodo = await apiService.post<TodoDTO>('/todos', {
          ...todo,
          id: newId,
        });

        dispatch(todoActions.todoAddSuccessful(newTodo));
      }
    } catch (e) {
      const error = e as Error;
      if (error.message === 'Request failed with status code 401') {
        dispatch(authActions.authOutUserOn());
        dispatch(todoActions.todoResetAll());
      } else {
        dispatch(todoActions.todoAddFailed({ error: error.message, id: newId }));
        setTimeout(() => dispatch(todoActions.todoEmptifyError()), 2000);
      }
    }
  };
