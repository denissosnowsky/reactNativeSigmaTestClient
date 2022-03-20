import { useCallback } from 'react';
import { Dispatch } from '@reduxjs/toolkit';

import { todoActions } from '~store/todo';
import { dispatchSelection } from '~utils/dispatchSelection';
import { fetchNextPage } from '../utils/fetchNextPage';

export const useOnEndReached = (isCanLoadMorePages: boolean, dispatch: Dispatch<any>) => {
  return useCallback(
    fetchNextPage(
      isCanLoadMorePages,
      dispatchSelection(dispatch, todoActions.todoNextPageRequested()),
    ),
    [dispatch, isCanLoadMorePages],
  );
};
