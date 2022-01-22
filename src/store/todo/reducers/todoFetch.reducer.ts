import { PayloadAction } from '@reduxjs/toolkit';

import { TodoDTO } from '~types/todo.types';
import { TodoState } from '..';

export const todoFetchReducer = {
  todosFetchRequested(state: TodoState) {
    state.loading = true;
  },
  todosFetchSuccessful(
    state: TodoState,
    action: PayloadAction<{
      todos: Array<TodoDTO>;
      count: number;
    }>,
  ) {
    state.deletedTodosBeforeNewPage = 0;
    state.todos = [...state.todos, ...action.payload.todos];
    state.allTodosCount = action.payload.count;
    state.loading = false;
  },
  todosFetchFailed(state: TodoState, action: PayloadAction<string>) {
    state.error = action.payload;
    state.loading = false;
  },
};
