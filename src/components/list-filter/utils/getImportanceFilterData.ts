import { Dispatch } from '@reduxjs/toolkit';

import { IconsNames, ImportantEnum } from '~types/todo.types';
import { todoActions, todoThunks } from '~store/todo';

export const getPriorityFilterData: Type = (page, dispatch) => {
  const isFirstPage = page === 1;

  return [
    {
      name: 'Default priority',
      icon: 'none-priority',
      action: () => {
        dispatch(todoActions.todoImportanceFilterRequested(ImportantEnum.DEFAULT));
        if (isFirstPage) {
          dispatch(todoThunks.todosFetchThunk());
        }
      },
    },
    {
      name: 'High priority',
      icon: 'high-priority',
      action: () => {
        dispatch(todoActions.todoImportanceFilterRequested(ImportantEnum.HIGH));
        if (isFirstPage) {
          dispatch(todoThunks.todosFetchThunk());
        }
      },
    },
    {
      name: 'Normal priority',
      icon: 'normal-priority',
      action: () => {
        dispatch(todoActions.todoImportanceFilterRequested(ImportantEnum.NORMAL));
        if (isFirstPage) {
          dispatch(todoThunks.todosFetchThunk());
        }
      },
    },
    {
      name: 'Low priority',
      icon: 'low-priority',
      action: () => {
        dispatch(todoActions.todoImportanceFilterRequested(ImportantEnum.LOW));
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
