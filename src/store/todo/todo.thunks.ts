import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

import { TodoDAO, TodoDTO } from '~types/todo.types';
import { AppState } from '~store';
import apiService from '~services/api.service';
import { actions } from './todo.actions';

const addTodo =
  (todo: TodoDAO): ThunkAction<void, AppState, void, AnyAction> =>
  async (
    dispatch: ThunkDispatch<AppState, void, AnyAction>,
    getState: () => AppState,
  ): Promise<void> => {
    const newId = getState().todo.cursor + 1;
    try {
      dispatch(actions.todoAddRequested({ ...todo, id: newId, completed: false }));

      const newTodo = await apiService.post<TodoDTO>('/todos', {
        ...todo,
        id: newId,
      });

      dispatch(actions.todoAddSuccessful(newTodo));
    } catch (e) {
      const error = e as Error;
      dispatch(actions.todoAddFailed({ error: error.message, id: newId }));
      setTimeout(() => dispatch(actions.todoEmptifyError()), 2000);
    }
  };

const getCursor =
  (): ThunkAction<void, AppState, void, AnyAction> =>
  async (dispatch: ThunkDispatch<AppState, void, AnyAction>): Promise<void> => {
    try {
      dispatch(actions.todoGetCoursorRequested());

      const cursor = await apiService.get<number>('/todos/cursor');

      dispatch(actions.todoGetCoursorSuccessful(cursor));
    } catch (e) {
      const error = e as Error;
      dispatch(actions.todoGetCoursorFailed(error.message));
      setTimeout(() => dispatch(actions.todoEmptifyError()), 2000);
    }
  };

const fetchTodos =
  (): ThunkAction<void, AppState, void, AnyAction> =>
  async (
    dispatch: ThunkDispatch<AppState, void, AnyAction>,
    getState: () => AppState,
  ): Promise<void> => {
    try {
      dispatch(actions.todosFetchRequested());

      const data = await apiService.get<{
        todos: Array<TodoDTO>;
        count: number;
      }>('/todos', {
        limit: getState().todo.limit,
        skip: getState().todo.skip,
      });

      dispatch(actions.todosFetchSuccessful({ todos: data.todos, count: data.count }));
    } catch (e) {
      const error = e as Error;
      dispatch(actions.todosFetchFailed(error.message));
      setTimeout(() => dispatch(actions.todoEmptifyError()), 2000);
    }
  };

const completeTodo =
  (id: number): ThunkAction<void, AppState, void, AnyAction> =>
  async (dispatch: ThunkDispatch<AppState, void, AnyAction>): Promise<void> => {
    try {
      dispatch(actions.todoCompleteRequested(id));

      await apiService.put<void>(`/todos/${id}`);

      dispatch(actions.todoCompleteSuccessful(id));
    } catch (e) {
      const error = e as Error;
      dispatch(actions.todoCompleteFailed({ error: error.message, id }));
      setTimeout(() => dispatch(actions.todoEmptifyError()), 2000);
    }
  };

const deleteTodo =
  (todos: Array<TodoDTO>): ThunkAction<void, AppState, void, AnyAction> =>
  async (dispatch: ThunkDispatch<AppState, void, AnyAction>): Promise<void> => {
    try {
      const idsList = todos.map((todo) => todo.id);
      dispatch(actions.todoDeleteRequested(idsList));

      await apiService.delete<void>(`/todos/delete?${idsList.map((id) => `id=${id}&`).join('')}`);

      dispatch(actions.todoDeleteSuccessful(idsList));
    } catch (e) {
      const error = e as Error;
      dispatch(actions.todoDeleteFailed(error.message));
      setTimeout(() => dispatch(actions.todoEmptifyError()), 2000);
    }
  };

const changeTodo =
  (id: number, text: string): ThunkAction<void, AppState, void, AnyAction> =>
  async (dispatch: ThunkDispatch<AppState, void, AnyAction>): Promise<void> => {
    try {
      dispatch(actions.todoChangeRequested({ id, text }));

      await apiService.put<void>(`/todos/${id}/change`, { text });

      dispatch(actions.todoChangeSuccessful(id));
    } catch (e) {
      const error = e as Error;
      dispatch(actions.todoChangeFailed({ error: error.message, id }));
      setTimeout(() => dispatch(actions.todoEmptifyError()), 2000);
    }
  };

export const thunks = {
  addTodo,
  getCursor,
  fetchTodos,
  completeTodo,
  deleteTodo,
  changeTodo,
};
