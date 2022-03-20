import { PayloadAction } from '@reduxjs/toolkit';

import { ImportantEnum } from '~types/todo.types';
import { TodoState } from '..';

export const todoImportanceFilterReducer = {
  todoImportanceFilterRequested(state: TodoState, action: PayloadAction<ImportantEnum>) {
    state.deletedTodosBeforeNewPage = 0;
    state.allTodosCount = 0;
    state.editingTodos = [];
    state.editingMode = false;
    state.todos = [];
    state.skip = 0;
    state.importantFilterMode = action.payload;
  },
};
