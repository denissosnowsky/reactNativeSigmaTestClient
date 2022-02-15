import { createSlice } from '@reduxjs/toolkit';

import { CompletenceFilter, ImportantEnum, SortTypes, TodoDTO } from '~types/todo.types';
import {
  todoAddReducer,
  todoFetchReducer,
  todoGetCoursorReducer,
  todoCompleteReducer,
  todoEditReducer,
  todoDeleteReducer,
  todoChangeReducer,
  todoEditingInputReducer,
  todoSortReducer,
  todoSelectReducer,
  todoEmptifyReducer,
  todoNextPageReducer,
  todoSelectAllReducer,
  todoEditChangeModalModeReducer,
  todoEditDeleteModalModeReducer,
  todoCompletenceFilterReducer,
  todoImportanceFilterReducer,
  todoFormInputReducer,
  todoResetAllReducer,
  todoTestsAddReducer,
} from './reducers';

export type TodoState = {
  error: string;
  limit: number;
  skip: number;
  cursor: number;
  loading: boolean;
  todos: Array<TodoDTO>;
  formInput: string;
  editingMode: boolean;
  editingInput: string;
  filterMode: SortTypes;
  allTodosCount: number;
  editingTodos: Array<TodoDTO>;
  isDeleteModalOpened: boolean;
  isChangeModalOpened: boolean;
  deletedTodosBeforeNewPage: number;
  importantFilterMode: ImportantEnum;
  completenceFilterMode: CompletenceFilter;
};

const initialState: TodoState = {
  skip: 0,
  limit: 30,
  cursor: 0,
  todos: [],
  error: '',
  formInput: '',
  loading: false,
  editingTodos: [],
  editingInput: '',
  allTodosCount: 0,
  editingMode: false,
  isDeleteModalOpened: false,
  isChangeModalOpened: false,
  deletedTodosBeforeNewPage: 0,
  filterMode: SortTypes.DEFAULT,
  importantFilterMode: ImportantEnum.DEFAULT,
  completenceFilterMode: CompletenceFilter.DEFAULT,
};

export const counterSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    ...todoFetchReducer,
    ...todoAddReducer,
    ...todoGetCoursorReducer,
    ...todoCompleteReducer,
    ...todoEditReducer,
    ...todoDeleteReducer,
    ...todoChangeReducer,
    ...todoEditingInputReducer,
    ...todoSortReducer,
    ...todoSelectReducer,
    ...todoEmptifyReducer,
    ...todoNextPageReducer,
    ...todoSelectAllReducer,
    ...todoEditChangeModalModeReducer,
    ...todoEditDeleteModalModeReducer,
    ...todoCompletenceFilterReducer,
    ...todoImportanceFilterReducer,
    ...todoFormInputReducer,
    ...todoResetAllReducer,
    ...todoTestsAddReducer,
  },
});

export default counterSlice.reducer;
