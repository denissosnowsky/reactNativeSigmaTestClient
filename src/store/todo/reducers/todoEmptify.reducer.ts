import { TodoState } from '..';

export const todoEmptifyReducer = {
  todoEmptifyError(state: TodoState) {
    state.error = '';
  },
};
