import { AnyAction } from '@reduxjs/toolkit';
import { SortTypes, TodoDTO, TodosColumns } from '~types/todo.types';

import { actions } from './todo.actions';

export type TodoState = {
  loading: boolean;
  error: string;
  cursor: number;
  todos: Array<TodoDTO>;
  editingMode: boolean;
  editingTodos: Array<TodoDTO>;
  editingInput: string;
  filterMode: SortTypes;
  allTodosCount: number;
  limit: number;
  skip: number;
};

const initialState: TodoState = {
  loading: false,
  error: '',
  cursor: 0,
  todos: [],
  editingMode: false,
  editingTodos: [],
  editingInput: '',
  filterMode: SortTypes.DEFAULT,
  allTodosCount: 0,
  limit: 30,
  skip: 0,
};

export const todoReducer = (state = initialState, action: AnyAction): TodoState => {
  switch (action.type) {
    case actions.todoAddRequested.type:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        allTodosCount: state.allTodosCount + 1,
        cursor: state.cursor + 1,
      };
    case actions.todoAddSuccessful.type:
      return {
        ...state,
      };
    case actions.todoAddFailed.type:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
        allTodosCount: state.allTodosCount - 1,
        cursor: state.cursor - 1,
        error: action.payload.error,
      };
    case actions.todoGetCoursorRequested.type:
      return {
        ...state,
      };
    case actions.todoGetCoursorSuccessful.type:
      return {
        ...state,
        cursor: action.payload,
      };
    case actions.todoGetCoursorFailed.type:
      return {
        ...state,
        error: action.payload,
      };
    case actions.todosFetchRequested.type:
      return {
        ...state,
        loading: true,
      };
    case actions.todosFetchSuccessful.type:
      return {
        ...state,
        todos: [...state.todos, ...action.payload.todos],
        allTodosCount: action.payload.count,
        loading: false,
      };
    case actions.todosFetchFailed.type:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case actions.todoCompleteRequested.type:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, completed: true } : todo,
        ),
      };
    case actions.todoCompleteSuccessful.type:
      return {
        ...state,
      };
    case actions.todoCompleteFailed.type:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, completed: false } : todo,
        ),
        error: action.payload.error,
      };
    case actions.todoEditModeOn.type: {
      const newEditingTodos = state.todos.find((todo) => todo.id === action.payload)!;
      return {
        ...state,
        editingTodos: [...state.editingTodos, newEditingTodos],
        editingInput: newEditingTodos?.title ?? '',
        editingMode: true,
      };
    }
    case actions.todoEditModeOff.type:
      return {
        ...state,
        editingTodos: [],
        editingInput: '',
        editingMode: false,
        filterMode:
          state.filterMode === SortTypes.SELECT_ASC || state.filterMode === SortTypes.SELECT_DESC
            ? SortTypes.DEFAULT
            : state.filterMode,
      };
    case actions.todoDeleteRequested.type:
      return {
        ...state,
        todos: state.todos.filter(
          (todo) => !action.payload.some((todoId: number) => todoId === todo.id),
        ),
        allTodosCount: state.allTodosCount - action.payload.length,
        editingMode: false,
        filterMode:
          state.filterMode === SortTypes.SELECT_ASC || state.filterMode === SortTypes.SELECT_DESC
            ? SortTypes.DEFAULT
            : state.filterMode,
      };
    case actions.todoDeleteSuccessful.type:
      return {
        ...state,
        editingTodos: [],
        editingInput: '',
      };
    case actions.todoDeleteFailed.type:
      return {
        ...state,
        todos: [...state.todos, ...state.editingTodos!],
        allTodosCount: state.allTodosCount + state.editingTodos!.length,
        editingTodos: [],
        editingInput: '',
        error: action.payload,
      };
    case actions.todoChangeRequested.type:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, title: action.payload.text } : todo,
        ),
        editingMode: false,
        filterMode:
          state.filterMode === SortTypes.SELECT_ASC || state.filterMode === SortTypes.SELECT_DESC
            ? SortTypes.DEFAULT
            : state.filterMode,
      };
    case actions.todoChangeSuccessful.type:
      return {
        ...state,
        editingTodos: [],
        editingInput: '',
      };
    case actions.todoChangeFailed.type:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, title: state.editingTodos[0]!.title } : todo,
        ),
        editingTodos: [],
        editingInput: '',
        error: action.payload.error,
      };
    case actions.todoEditingInputChange.type:
      return {
        ...state,
        editingInput: action.payload,
      };
    case actions.todoSort.type: {
      switch (action.payload) {
        case TodosColumns.ID:
          return {
            ...state,
            filterMode:
              state.filterMode === SortTypes.DEFAULT || state.filterMode === SortTypes.ID_ASC
                ? SortTypes.ID_DESC
                : SortTypes.ID_ASC,
          };
        case TodosColumns.NAME:
          return {
            ...state,
            filterMode:
              state.filterMode === SortTypes.DEFAULT || state.filterMode === SortTypes.NAME_ASC
                ? SortTypes.NAME_DESC
                : SortTypes.NAME_ASC,
          };
        case TodosColumns.STATUS:
          return {
            ...state,
            filterMode:
              state.filterMode === SortTypes.DEFAULT || state.filterMode === SortTypes.STATUS_ASC
                ? SortTypes.STATUS_DESC
                : SortTypes.STATUS_ASC,
          };
        case TodosColumns.SELECT:
          return {
            ...state,
            filterMode:
              state.filterMode === SortTypes.DEFAULT || state.filterMode === SortTypes.SELECT_ASC
                ? SortTypes.SELECT_DESC
                : SortTypes.SELECT_ASC,
          };
        default:
          return {
            ...state,
            filterMode: SortTypes.DEFAULT,
          };
      }
    }
    case actions.todoSelect.type: {
      const newEditingTodos = state.todos.find((todo) => todo.id === action.payload)!;
      return {
        ...state,
        editingTodos: [...state.editingTodos, newEditingTodos],
      };
    }
    case actions.todoDeselect.type: {
      return {
        ...state,
        editingTodos: state.editingTodos.filter((todo) => todo.id !== action.payload),
      };
    }
    case actions.todoEmptifyError.type: {
      return {
        ...state,
        error: '',
      };
    }
    case actions.todoNextPage.type: {
      return {
        ...state,
        skip: state.skip + state.limit,
      };
    }
    default:
      return state;
  }
};
