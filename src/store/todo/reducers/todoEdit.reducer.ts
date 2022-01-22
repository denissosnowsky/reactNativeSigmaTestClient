import { PayloadAction } from '@reduxjs/toolkit';

import { SortTypes } from '~types/todo.types';
import { TodoState } from '..';

const newEditingTodos = (state: TodoState, action: PayloadAction<number>) =>
  state.todos.find((todo) => todo.id === action.payload)!;

export const todoEditReducer = {
  todoEditModeOn(state: TodoState, action: PayloadAction<number>) {
    state.editingTodos = [...state.editingTodos, newEditingTodos(state, action)];
    state.editingInput = newEditingTodos(state, action)?.title ?? '';
    state.editingMode = true;
  },
  todoEditModeOff(state: TodoState) {
    state.editingTodos = [];
    state.editingInput = '';
    state.editingMode = false;
    state.filterMode =
      state.filterMode === SortTypes.SELECT_ASC || state.filterMode === SortTypes.SELECT_DESC
        ? SortTypes.DEFAULT
        : state.filterMode;
  },
};
