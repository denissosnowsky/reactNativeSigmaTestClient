import { PayloadAction } from '@reduxjs/toolkit';

import { TodoState } from '..';

export const todoEditChangeModalModeReducer = {
  todoEditChangeModalModeOn(state: TodoState, action: PayloadAction<boolean>) {
    state.isChangeModalOpened = action.payload;
  },
};
