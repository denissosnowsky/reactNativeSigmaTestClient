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
} from './reducers';

export type TodoState = {
  loading: boolean;
  error: string;
  cursor: number;
  todos: Array<TodoDTO>;
  editingMode: boolean;
  editingTodos: Array<TodoDTO>;
  editingInput: string;
  filterMode: SortTypes;
  allTodosCount: number;
  limit: number;
  skip: number;
  deletedTodosBeforeNewPage: number;
  isDeleteModalOpened: boolean;
  isChangeModalOpened: boolean;
  completenceFilterMode: CompletenceFilter;
  importantFilterMode: ImportantEnum;
};

const initialState: TodoState = {
  loading: false,
  error: '',
  cursor: 0,
  todos: [],
  editingMode: false,
  editingTodos: [],
  editingInput: '',
  filterMode: SortTypes.DEFAULT,
  allTodosCount: 0,
  limit: 30,
  skip: 0,
  deletedTodosBeforeNewPage: 0,
  isDeleteModalOpened: false,
  isChangeModalOpened: false,
  completenceFilterMode: CompletenceFilter.DEFAULT,
  importantFilterMode: ImportantEnum.DEFAULT,
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
  },
});

export default counterSlice.reducer;
