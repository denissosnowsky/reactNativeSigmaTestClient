import { ImportantEnum } from '~types/todo.types';
import { TodoState } from '..';

const testTodos = [
  { userId: 1, id: 1, title: 'Test todo 1', completed: false, important: ImportantEnum.DEFAULT },
  { userId: 1, id: 2, title: 'Test todo 2', completed: false, important: ImportantEnum.DEFAULT },
  { userId: 1, id: 3, title: 'Test todo 3', completed: false, important: ImportantEnum.DEFAULT },
];

export const todoTestsAddReducer = {
  todoTestsAddOn(state: TodoState) {
    state.todos = testTodos;
    state.loading = false;
    state.allTodosCount = 3;
    state.cursor = 3;
  },
};
