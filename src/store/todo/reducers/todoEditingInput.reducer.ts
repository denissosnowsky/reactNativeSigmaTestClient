import { PayloadAction } from '@reduxjs/toolkit';

import { TodoState } from '..';

export const todoEditingInputReducer = {
  todoEditingInputChange(state: TodoState, action: PayloadAction<string>) {
    state.editingInput = action.payload;
  },
};
