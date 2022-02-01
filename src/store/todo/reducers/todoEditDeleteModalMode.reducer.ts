import { PayloadAction } from '@reduxjs/toolkit';

import { TodoState } from '..';

export const todoEditDeleteModalModeReducer = {
  todoEditDeleteModalModeOn(state: TodoState, action: PayloadAction<boolean>) {
    state.isDeleteModalOpened = action.payload;
  },
};
