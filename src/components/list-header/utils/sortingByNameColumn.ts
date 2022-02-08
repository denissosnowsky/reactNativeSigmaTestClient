import { SortTypes } from '~types/todo.types';

export const sortingByNameColumn = (filterMode: SortTypes) => {
  switch (filterMode) {
    case SortTypes.NAME_ASC:
      return 'sort-asc';
    case SortTypes.NAME_DESC:
      return 'sort-desc';
    default:
      return 'sort';
  }
};
