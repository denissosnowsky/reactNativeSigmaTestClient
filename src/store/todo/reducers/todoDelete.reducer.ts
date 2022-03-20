import { PayloadAction } from '@reduxjs/toolkit';

import { SortTypes, TodoDTO } from '~types/todo.types';
import { TodoState } from '..';

let isLastIdDeleted: boolean;
let updatedTodos: Array<TodoDTO>;
let maxIdFromDeletedTodos: number;

const isLastIdDeletedHandle = (prevLastId: number, deletedIds: Array<number>) => {
  let isLastDeleted: boolean;
  const maxIdFromDeletedIds = Math.max(...deletedIds);

  maxIdFromDeletedTodos = maxIdFromDeletedIds;
  if (maxIdFromDeletedIds === prevLastId) {
    isLastDeleted = true;
  } else {
    isLastDeleted = false;
  }
  isLastIdDeleted = isLastDeleted;
  return isLastDeleted;
};

const updatedTodosHandle = (prevTodos: TodoDTO[], idsList: number[]) => {
  const updatedTodosList = prevTodos.filter(
    (todo) => !idsList.some((todoId: number) => todoId === todo.id),
  );
  updatedTodos = updatedTodosList;
  return updatedTodosList;
};

export const todoDeleteReducer = {
  todoDeleteRequested(state: TodoState, action: PayloadAction<Array<number>>) {
    state.todos = updatedTodosHandle(state.todos, action.payload);
    state.allTodosCount -= action.payload.length;
    state.deletedTodosBeforeNewPage += action.payload.length;
    state.editingMode = false;
    state.filterMode =
      state.filterMode === SortTypes.SELECT_ASC || state.filterMode === SortTypes.SELECT_DESC
        ? SortTypes.DEFAULT
        : state.filterMode;
    state.cursor = isLastIdDeletedHandle(state.cursor, action.payload)
      ? updatedTodos.length > 0
        ? Math.max(...updatedTodos.map((todo) => todo.id))
        : 0
      : state.cursor;
  },
  todoDeleteSuccessful(state: TodoState, action: PayloadAction<Array<number>>) {
    state.editingTodos = [];
    state.editingInput = '';
  },
  todoDeleteFailed(state: TodoState, action: PayloadAction<{ error: string; ids: number[] }>) {
    state.todos = [...state.todos, ...state.editingTodos!];
    state.allTodosCount += state.editingTodos!.length;
    state.deletedTodosBeforeNewPage -= action.payload.ids.length;
    state.editingTodos = [];
    state.editingInput = '';
    state.error = action.payload.error;
    state.cursor = isLastIdDeletedHandle(state.cursor, action.payload.ids)
      ? maxIdFromDeletedTodos
      : state.cursor;
  },
};
