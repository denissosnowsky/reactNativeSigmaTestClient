import { SortTypes, TodoDTO } from '~types/todo.types';

export const idSorting = (
  sortMode: SortTypes.ID_ASC | SortTypes.ID_DESC,
  todosList: Array<TodoDTO>,
): Array<TodoDTO> => {
  switch (sortMode) {
    case SortTypes.ID_ASC:
      return todosList.sort((a, b) => a.id - b.id);
    case SortTypes.ID_DESC:
    default:
      return todosList.sort((a, b) => b.id - a.id);
  }
};
