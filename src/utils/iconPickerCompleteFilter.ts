import { CompletenceFilter } from '~types/todo.types';

export const iconPickerCompleteFilter = (completenceFilterMode: CompletenceFilter) => {
  switch (completenceFilterMode) {
    case CompletenceFilter.COMPLETED:
      return 'check';
    case CompletenceFilter.UNCOMPLETED:
      return 'circle-outline';
    case CompletenceFilter.DEFAULT:
    default:
      return 'default-hide';
  }
};
