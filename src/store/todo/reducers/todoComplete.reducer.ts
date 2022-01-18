import { PayloadAction } from '@reduxjs/toolkit';

import { TodoState } from '..';

export const todoCompleteReducer = {
  todoCompleteRequested(state: TodoState, action: PayloadAction<number>) {
    state.todos = state.todos.map((todo) =>
      todo.id === action.payload ? { ...todo, completed: true } : todo,
    );
  },
  todoCompleteSuccessful(state: TodoState, action: PayloadAction<number>) {
    state = state;
  },
  todoCompleteFailed(state: TodoState, action: PayloadAction<{ error: string; id: number }>) {
    state.todos = state.todos.map((todo) =>
      todo.id === action.payload.id ? { ...todo, completed: false } : todo,
    );
    state.error = action.payload.error;
  },
};
