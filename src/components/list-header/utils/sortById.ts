import { Dispatch } from '@reduxjs/toolkit';

import { todoActions } from '~store/todo';
import { TodosColumns } from '~types/todo.types';

export const sortById = (isEditingMode: boolean, dispatch: Dispatch<any>) => {
  return () => {
    if (!isEditingMode) {
      dispatch(todoActions.todoSortRequested(TodosColumns.ID));
    }
  };
};
