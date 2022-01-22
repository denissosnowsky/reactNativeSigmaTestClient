import { PayloadAction } from '@reduxjs/toolkit';

import { SortTypes, TodosColumns } from '~types/todo.types';
import { TodoState } from '..';

const pickSort = (state: TodoState, action: PayloadAction<TodosColumns>) => {
  switch (action.payload) {
    case TodosColumns.ID:
      return state.filterMode === SortTypes.DEFAULT || state.filterMode === SortTypes.ID_ASC
        ? SortTypes.ID_DESC
        : SortTypes.ID_ASC;
    case TodosColumns.NAME:
      return state.filterMode === SortTypes.DEFAULT || state.filterMode === SortTypes.NAME_ASC
        ? SortTypes.NAME_DESC
        : SortTypes.NAME_ASC;
    case TodosColumns.STATUS:
      return state.filterMode === SortTypes.DEFAULT || state.filterMode === SortTypes.STATUS_ASC
        ? SortTypes.STATUS_DESC
        : SortTypes.STATUS_ASC;
    case TodosColumns.SELECT:
      return state.filterMode === SortTypes.DEFAULT || state.filterMode === SortTypes.SELECT_ASC
        ? SortTypes.SELECT_DESC
        : SortTypes.SELECT_ASC;
    default:
      return SortTypes.DEFAULT;
  }
};

export const todoSortReducer = {
  todoSortRequested(state: TodoState, action: PayloadAction<TodosColumns>) {
    state.filterMode = pickSort(state, action);
  },
};
