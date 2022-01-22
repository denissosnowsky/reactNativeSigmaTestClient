import { PayloadAction } from '@reduxjs/toolkit';

import { SortTypes } from '~types/todo.types';
import { TodoState } from '..';

export const todoChangeReducer = {
  todoChangeRequested(state: TodoState, action: PayloadAction<{ id: number; text: string }>) {
    state.todos = state.todos.map((todo) =>
      todo.id === action.payload.id ? { ...todo, title: action.payload.text } : todo,
    );
    state.editingMode = false;
    state.filterMode =
      state.filterMode === SortTypes.SELECT_ASC || state.filterMode === SortTypes.SELECT_DESC
        ? SortTypes.DEFAULT
        : state.filterMode;
  },
  todoChangeSuccessful(state: TodoState, action: PayloadAction<number>) {
    state.editingTodos = [];
    state.editingInput = '';
  },
  todoChangeFailed(state: TodoState, action: PayloadAction<{ error: string; id: number }>) {
    state.todos = state.todos.map((todo) =>
      todo.id === action.payload.id ? { ...todo, title: state.editingTodos[0]!.title } : todo,
    );
    state.editingTodos = [];
    state.editingInput = '';
    state.error = action.payload.error;
  },
};
