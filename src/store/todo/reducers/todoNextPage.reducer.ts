import { TodoState } from '..';

export const todoNextPageReducer = {
  todoNextPageRequested(state: TodoState) {
    state.skip += state.limit;
  },
};
