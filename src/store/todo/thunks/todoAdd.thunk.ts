import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

import { TodoDAO, TodoDTO } from '~types/todo.types';
import { AppState } from '~store';
import apiService from '~services/api.service';
import { todoActions } from '../actions';

export const todoAddThunk =
  (todo: TodoDAO): ThunkAction<void, AppState, void, AnyAction> =>
  async (
    dispatch: ThunkDispatch<AppState, void, AnyAction>,
    getState: () => AppState,
  ): Promise<void> => {
    const newId = getState().todo.cursor + 1;
    try {
      dispatch(todoActions.todoAddRequested({ ...todo, id: newId, completed: false }));

      const newTodo = await apiService.post<TodoDTO>('/todos', {
        ...todo,
        id: newId,
      });

      dispatch(todoActions.todoAddSuccessful(newTodo));
    } catch (e) {
      const error = e as Error;
      dispatch(todoActions.todoAddFailed({ error: error.message, id: newId }));
      setTimeout(() => dispatch(todoActions.todoEmptifyError()), 2000);
    }
  };
