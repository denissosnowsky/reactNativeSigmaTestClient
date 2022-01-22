import { SortTypes, TodoDTO } from '~types/todo.types';
import { stringSorting } from './stringSorting';

export const nameSorting = (
  sortMode: SortTypes.NAME_ASC | SortTypes.NAME_DESC,
  todosList: Array<TodoDTO>,
): Array<TodoDTO> => {
  switch (sortMode) {
    case SortTypes.NAME_ASC:
      return todosList.sort((a, b) => {
        return stringSorting(a.title.toLowerCase(), b.title.toLowerCase(), 'asc');
      });
    case SortTypes.NAME_DESC:
    default:
      return todosList.sort((a, b) => {
        return stringSorting(a.title.toLowerCase(), b.title.toLowerCase(), 'desc');
      });
  }
};
