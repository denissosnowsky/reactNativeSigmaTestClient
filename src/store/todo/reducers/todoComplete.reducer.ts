import { PayloadAction } from '@reduxjs/toolkit';

import { TodoState } from '..';

export const todoCompleteReducer = {
  todoCompleteRequested(state: TodoState, action: PayloadAction<number>) {
    state.todos = state.todos.map((todo) =>
      todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo,
    );
    state.editingTodos = state.editingTodos.map((todo) =>
      todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo,
    );
  },
  todoCompleteSuccessful(state: TodoState, action: PayloadAction<number>) {
    state = state;
  },
  todoCompleteFailed(state: TodoState, action: PayloadAction<{ error: string; id: number }>) {
    state.todos = state.todos.map((todo) =>
      todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo,
    );
    state.editingTodos = state.editingTodos.map((todo) =>
      todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo,
    );
    state.error = action.payload.error;
  },
};
