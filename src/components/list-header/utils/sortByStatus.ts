import { Dispatch } from '@reduxjs/toolkit';

import { todoActions } from '~store/todo';
import { TodosColumns } from '~types/todo.types';

export const sortByStatus = (
  isEditingMode: boolean,
  isFilteredByCompletence: boolean,
  dispatch: Dispatch<any>,
) => {
  return () => {
    if (!isEditingMode && !isFilteredByCompletence) {
      dispatch(todoActions.todoSortRequested(TodosColumns.STATUS));
    }
  };
};
