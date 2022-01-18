import { PayloadAction } from '@reduxjs/toolkit';

import { TodoState } from '..';

export const todoSelectReducer = {
  todoSelectOn(state: TodoState, action: PayloadAction<number>) {
    state.editingTodos = [
      ...state.editingTodos,
      state.todos.find((todo) => todo.id === action.payload)!,
    ];
  },
  todoDeselectOn(state: TodoState, action: PayloadAction<number>) {
    state.editingTodos = state.editingTodos.filter((todo) => todo.id !== action.payload);
  },
};
