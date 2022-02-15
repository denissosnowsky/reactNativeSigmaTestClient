import { CompletenceFilter, ImportantEnum, SortTypes } from '~types/todo.types';
import { TodoState } from '..';

export const todoResetAllReducer = {
  todoResetAll(state: TodoState) {
    state.skip = 0;
    state.limit = 30;
    state.cursor = 0;
    state.todos = [];
    state.error = '';
    state.formInput = '';
    state.loading = false;
    state.editingTodos = [];
    state.editingInput = '';
    state.allTodosCount = 0;
    state.editingMode = false;
    state.isDeleteModalOpened = false;
    state.isChangeModalOpened = false;
    state.deletedTodosBeforeNewPage = 0;
    state.filterMode = SortTypes.DEFAULT;
    state.importantFilterMode = ImportantEnum.DEFAULT;
    state.completenceFilterMode = CompletenceFilter.DEFAULT;
  },
};
