import { Dispatch } from '@reduxjs/toolkit';

import { todoActions } from '~store/todo';
import { TodosColumns } from '~types/todo.types';

export const sortBySelected = (dispatch: Dispatch<any>) => {
  return () => {
    dispatch(todoActions.todoSortRequested(TodosColumns.SELECT));
  };
};
