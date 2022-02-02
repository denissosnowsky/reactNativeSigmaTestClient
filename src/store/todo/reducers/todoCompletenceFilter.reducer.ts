import { PayloadAction } from '@reduxjs/toolkit';

import { CompletenceFilter } from '~types/todo.types';
import { TodoState } from '..';

export const todoCompletenceFilterReducer = {
  todoCompletenceFilterRequested(state: TodoState, action: PayloadAction<CompletenceFilter>) {
    state.deletedTodosBeforeNewPage = 0;
    state.allTodosCount = 0;
    state.editingTodos = [];
    state.editingMode = false;
    state.todos = [];
    state.skip = 0;
    state.completenceFilterMode = action.payload;
  },
};
