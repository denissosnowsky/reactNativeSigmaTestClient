import { SortTypes, TodoDTO } from '~types/todo.types';
import { stringSorting } from '~utils/stringSorting';
import { booleanSorting } from '~utils/booleanSorting';
import { AppState } from '~store';

const loading = (state: AppState): boolean => state.todo.loading;
const error = (state: AppState): string => state.todo.error;
const cursor = (state: AppState): number => state.todo.cursor;
const editingMode = (state: AppState): boolean => state.todo.editingMode;
const editingTodos = (state: AppState): Array<TodoDTO> => state.todo.editingTodos;
const editingInput = (state: AppState): string => state.todo.editingInput;
const filterMode = (state: AppState): SortTypes => state.todo.filterMode;
const allTodosCount = (state: AppState): number => state.todo.allTodosCount;
const isListInitializing = (state: AppState): boolean =>
  state.todo.todos.length === 0 && state.todo.loading;
const page = (state: AppState): number =>
  state.todo.skip ? state.todo.skip / state.todo.limit + 1 : 1;
const todos = (state: AppState): Array<TodoDTO> => {
  const todosList = [...state.todo.todos];
  const edidtinTodos = state.todo.editingTodos;
  const notEditingTodos = todosList.filter(
    (todo) => !edidtinTodos.some((eTodo) => eTodo.id === todo.id),
  );

  switch (state.todo.filterMode) {
    case SortTypes.ID_ASC:
      return todosList.sort((a, b) => a.id - b.id);
    case SortTypes.ID_DESC:
      return todosList.sort((a, b) => b.id - a.id);
    case SortTypes.NAME_ASC:
      return todosList.sort((a, b) => {
        return stringSorting(a.title.toLowerCase(), b.title.toLowerCase(), 'asc');
      });
    case SortTypes.NAME_DESC:
      return todosList.sort((a, b) => {
        return stringSorting(a.title.toLowerCase(), b.title.toLowerCase(), 'desc');
      });
    case SortTypes.STATUS_ASC:
      return todosList.sort((a, b) => {
        return booleanSorting(a.completed, b.completed, 'asc');
      });
    case SortTypes.STATUS_DESC:
      return todosList.sort((a, b) => {
        return booleanSorting(a.completed, b.completed, 'desc');
      });
    case SortTypes.SELECT_ASC: {
      return [...edidtinTodos, ...notEditingTodos];
    }
    case SortTypes.SELECT_DESC:
      return [...notEditingTodos, ...edidtinTodos];
    default:
      return todosList;
  }
};

export default {
  loading,
  cursor,
  todos,
  editingMode,
  editingTodos,
  editingInput,
  filterMode,
  error,
  allTodosCount,
  page,
  isListInitializing,
};
