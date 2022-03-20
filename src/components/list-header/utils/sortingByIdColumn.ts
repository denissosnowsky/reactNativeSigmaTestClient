import { SortTypes } from '~types/todo.types';

export const sortingByIdColumn = (filterMode: SortTypes) => {
  switch (filterMode) {
    case SortTypes.ID_ASC:
      return 'sort-asc';
    case SortTypes.ID_DESC:
      return 'sort-desc';
    default:
      return 'sort';
  }
};
