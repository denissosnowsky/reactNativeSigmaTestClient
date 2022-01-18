import { PayloadAction } from '@reduxjs/toolkit';

import { TodoState } from '..';

export const todoGetCoursorReducer = {
  todoGetCoursorRequested(state: TodoState) {
    state = state;
  },
  todoGetCoursorSuccessful(state: TodoState, action: PayloadAction<number>) {
    state.cursor = action.payload;
  },
  todoGetCoursorFailed(state: TodoState, action: PayloadAction<string>) {
    state.error = action.payload;
  },
};
