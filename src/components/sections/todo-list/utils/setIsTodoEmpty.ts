import { TodoDTO } from '~types/todo.types';

export const setIsTodoEmpty = (todos: TodoDTO[]) => {
  return todos.length === 0;
};
