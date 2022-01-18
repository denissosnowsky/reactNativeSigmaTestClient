import { PayloadAction } from '@reduxjs/toolkit';

import { SortTypes } from '~types/todo.types';
import { TodoState } from '..';

export const todoDeleteReducer = {
  todoDeleteRequested(state: TodoState, action: PayloadAction<Array<number>>) {
    state.todos = state.todos.filter(
      (todo) => !action.payload.some((todoId: number) => todoId === todo.id),
    );
    state.allTodosCount -= action.payload.length;
    state.deletedTodosBeforeNewPage += action.payload.length;
    state.editingMode = false;
    state.filterMode =
      state.filterMode === SortTypes.SELECT_ASC || state.filterMode === SortTypes.SELECT_DESC
        ? SortTypes.DEFAULT
        : state.filterMode;
  },
  todoDeleteSuccessful(state: TodoState, action: PayloadAction<Array<number>>) {
    state.editingTodos = [];
    state.editingInput = '';
  },
  todoDeleteFailed(state: TodoState, action: PayloadAction<string>) {
    state.todos = [...state.todos, ...state.editingTodos!];
    state.allTodosCount += state.editingTodos!.length;
    state.deletedTodosBeforeNewPage -= action.payload.length;
    state.editingTodos = [];
    state.editingInput = '';
    state.error = action.payload;
  },
};
