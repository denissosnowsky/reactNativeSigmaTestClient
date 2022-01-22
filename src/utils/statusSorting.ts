import { SortTypes, TodoDTO } from '~types/todo.types';
import { booleanSorting } from './booleanSorting';

export const statusSorting = (
  sortMode: SortTypes.STATUS_ASC | SortTypes.STATUS_DESC,
  todosList: Array<TodoDTO>,
): Array<TodoDTO> => {
  switch (sortMode) {
    case SortTypes.STATUS_ASC:
      return todosList.sort((a, b) => {
        return booleanSorting(a.completed, b.completed, 'asc');
      });
    case SortTypes.STATUS_DESC:
    default:
      return todosList.sort((a, b) => {
        return booleanSorting(a.completed, b.completed, 'desc');
      });
  }
};
