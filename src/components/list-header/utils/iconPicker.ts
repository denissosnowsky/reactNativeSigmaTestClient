import { SortTypes, TodosColumns } from '~types/todo.types';

export const iconPicker = (
  columnType: TodosColumns,
  filterMode: SortTypes,
): 'sort' | 'sort-asc' | 'sort-desc' => {
  switch (columnType) {
    case TodosColumns.ID:
      switch (filterMode) {
        case SortTypes.ID_ASC:
          return 'sort-asc';
        case SortTypes.ID_DESC:
          return 'sort-desc';
        default:
          return 'sort';
      }
    case TodosColumns.NAME:
      switch (filterMode) {
        case SortTypes.NAME_ASC:
          return 'sort-asc';
        case SortTypes.NAME_DESC:
          return 'sort-desc';
        default:
          return 'sort';
      }
    case TodosColumns.STATUS:
      switch (filterMode) {
        case SortTypes.STATUS_ASC:
          return 'sort-asc';
        case SortTypes.STATUS_DESC:
          return 'sort-desc';
        default:
          return 'sort';
      }
    case TodosColumns.SELECT:
      switch (filterMode) {
        case SortTypes.SELECT_ASC:
          return 'sort-asc';
        case SortTypes.SELECT_DESC:
          return 'sort-desc';
        default:
          return 'sort';
      }
    default:
      return 'sort';
  }
};
