import { PayloadAction } from '@reduxjs/toolkit';

import { TodoDTO } from '~types/todo.types';
import { TodoState } from '..';

export const todoAddReducer = {
  todoAddRequested(state: TodoState, action: PayloadAction<TodoDTO>) {
    state.todos = [action.payload, ...state.todos];
    state.allTodosCount += 1;
    state.deletedTodosBeforeNewPage -= 1;
    state.cursor += 1;
  },
  todoAddSuccessful(state: TodoState, action: PayloadAction<TodoDTO>) {
    state = state;
  },
  todoAddFailed(state: TodoState, action: PayloadAction<{ error: string; id: number }>) {
    state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    state.allTodosCount -= 1;
    state.cursor -= 1;
    state.deletedTodosBeforeNewPage += 1;
    state.error = action.payload.error;
  },
};
