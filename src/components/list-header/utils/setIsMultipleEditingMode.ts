import { TodoDTO } from '~types/todo.types';

export const setIsMultipleEditingMode = (editingTodos: TodoDTO[], isEditingMode: boolean) => {
  return editingTodos.length > 1 && isEditingMode;
};
