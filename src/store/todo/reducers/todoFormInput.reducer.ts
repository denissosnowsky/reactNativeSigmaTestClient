import { PayloadAction } from '@reduxjs/toolkit';

import { TodoState } from '..';

export const todoFormInputReducer = {
  todoFormInputChange(state: TodoState, action: PayloadAction<string>) {
    state.formInput = action.payload;
  },
};
