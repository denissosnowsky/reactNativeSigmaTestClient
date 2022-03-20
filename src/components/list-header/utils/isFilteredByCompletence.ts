import { CompletenceFilter } from '~types/todo.types';

export const setFilterByCompletenceMode = (completenceFilterMode: CompletenceFilter) => {
  return (
    completenceFilterMode === CompletenceFilter.COMPLETED ||
    completenceFilterMode === CompletenceFilter.UNCOMPLETED
  );
};
