import { SortTypes, TodosColumns } from '~types/todo.types';
import { sortingByIdColumn } from './sortingByIdColumn';
import { sortingByNameColumn } from './sortingByNameColumn';
import { sortingBySelectedColumn } from './sortingBySelectedColumn';
import { sortingByStatusColumn } from './sortingByStatusColumn';

export const iconPicker = (
  columnType: TodosColumns,
  filterMode: SortTypes,
): 'sort' | 'sort-asc' | 'sort-desc' => {
  switch (columnType) {
    case TodosColumns.ID:
      return sortingByIdColumn(filterMode);
    case TodosColumns.NAME:
      return sortingByNameColumn(filterMode);
    case TodosColumns.STATUS:
      return sortingByStatusColumn(filterMode);
    case TodosColumns.SELECT:
      return sortingBySelectedColumn(filterMode);
    default:
      return 'sort';
  }
};
