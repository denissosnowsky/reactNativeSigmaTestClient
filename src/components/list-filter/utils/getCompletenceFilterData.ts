import { Dispatch } from '@reduxjs/toolkit';

import { IconsNames, CompletenceFilter } from '~types/todo.types';
import { todoActions, todoThunks } from '~store/todo';

export const getCompletenceFilterData: Type = (page, dispatch) => {
  const isFirstPage = page === 1;

  return [
    {
      name: 'Default status',
      icon: 'default-hide',
      action: () => {
        dispatch(todoActions.todoCompletenceFilterRequested(CompletenceFilter.DEFAULT));
        if (isFirstPage) {
          dispatch(todoThunks.todosFetchThunk());
        }
      },
    },
    {
      name: 'Completed',
      icon: 'check',
      action: () => {
        dispatch(todoActions.todoCompletenceFilterRequested(CompletenceFilter.COMPLETED));
        if (isFirstPage) {
          dispatch(todoThunks.todosFetchThunk());
        }
      },
    },
    {
      name: 'Uncompleted',
      icon: 'circle-outline',
      action: () => {
        dispatch(todoActions.todoCompletenceFilterRequested(CompletenceFilter.UNCOMPLETED));
        if (isFirstPage) {
          dispatch(todoThunks.todosFetchThunk());
        }
      },
    },
  ];
};

type Type = (
  page: number,
  dispatch: Dispatch<any>,
) => Array<{
  name: string;
  icon: IconsNames;
  action: () => void;
}>;
