import { TodoState } from '..';

export const todoSelectAllReducer = {
  todoSelectAll(state: TodoState) {
    state.editingTodos = [...state.todos];
  },
};
