import { SortTypes } from '~types/todo.types';

export const sortingBySelectedColumn = (filterMode: SortTypes) => {
  switch (filterMode) {
    case SortTypes.SELECT_ASC:
      return 'sort-asc';
    case SortTypes.SELECT_DESC:
      return 'sort-desc';
    default:
      return 'sort';
  }
};
