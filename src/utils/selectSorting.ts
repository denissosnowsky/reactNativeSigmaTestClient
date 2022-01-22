import { SortTypes, TodoDTO } from '~types/todo.types';

export const selectSorting = (
  sortMode: SortTypes.SELECT_ASC | SortTypes.SELECT_DESC,
  edidtinTodos: Array<TodoDTO>,
  notEditingTodos: Array<TodoDTO>,
): Array<TodoDTO> => {
  switch (sortMode) {
    case SortTypes.SELECT_ASC:
      return [...edidtinTodos, ...notEditingTodos];
    case SortTypes.SELECT_DESC:
    default:
      return [...notEditingTodos, ...edidtinTodos];
  }
};
