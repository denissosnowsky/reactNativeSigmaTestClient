import { SortTypes } from '~types/todo.types';

export const sortingByStatusColumn = (filterMode: SortTypes) => {
  switch (filterMode) {
    case SortTypes.STATUS_ASC:
      return 'sort-asc';
    case SortTypes.STATUS_DESC:
      return 'sort-desc';
    default:
      return 'sort';
  }
};
