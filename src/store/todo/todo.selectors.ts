import { Draft } from '@reduxjs/toolkit';

import { SortTypes, TodoDTO } from '~types/todo.types';
import { AppState } from '~store';
import { idSorting } from '~utils/idSorting';
import { nameSorting } from '~utils/nameSorting';
import { statusSorting } from '~utils/statusSorting';
import { selectSorting } from '~utils/selectSorting';

const loading = (state: AppState): boolean => state.todo.loading;
const error = (state: AppState): string => state.todo.error;
const cursor = (state: AppState): number => state.todo.cursor;
const editingMode = (state: AppState): boolean => state.todo.editingMode;
const editingTodos = (state: AppState): Array<TodoDTO> => state.todo.editingTodos;
const editingInput = (state: AppState): string => state.todo.editingInput;
const filterMode = (state: AppState): SortTypes => state.todo.filterMode;
const allTodosCount = (state: AppState): number => state.todo.allTodosCount;
const isListInitializing = (state: AppState): boolean =>
  state.todo.todos.length === 0 && state.todo.loading;
const page = (state: AppState): number =>
  state.todo.skip ? state.todo.skip / state.todo.limit + 1 : 1;
const todos = (state: AppState): Array<TodoDTO> => {
  const todosList = [...state.todo.todos];
  const edidtinTodos = state.todo.editingTodos;
  const notEditingTodos = todosList.filter(
    (todo) => !edidtinTodos.some((eTodo) => eTodo.id === todo.id),
  );

  switch (state.todo.filterMode) {
    case SortTypes.ID_ASC:
    case SortTypes.ID_DESC:
      return idSorting(state.todo.filterMode, todosList);
    case SortTypes.NAME_ASC:
    case SortTypes.NAME_DESC:
      return nameSorting(state.todo.filterMode, todosList);
    case SortTypes.STATUS_ASC:
    case SortTypes.STATUS_DESC:
      return statusSorting(state.todo.filterMode, todosList);
    case SortTypes.SELECT_ASC:
    case SortTypes.SELECT_DESC:
      return selectSorting(state.todo.filterMode, edidtinTodos, notEditingTodos);
    default:
      return todosList;
  }
};
const isDeleteModalOpened = (state: AppState): boolean => state.todo.isDeleteModalOpened;
const isChangeModalOpened = (state: AppState): boolean => state.todo.isChangeModalOpened;

export default {
  loading,
  cursor,
  todos,
  editingMode,
  editingTodos,
  editingInput,
  filterMode,
  error,
  allTodosCount,
  page,
  isListInitializing,
  isDeleteModalOpened,
  isChangeModalOpened,
};
