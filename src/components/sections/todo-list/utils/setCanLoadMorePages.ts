import { TodoDTO } from '~types/todo.types';

export const setCanLoadMorePages = (
  allTodosCount: number,
  todos: TodoDTO[],
  isLoading: boolean,
) => {
  return allTodosCount > todos.length && !isLoading;
};
