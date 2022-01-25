import { AppState } from '~store';
import { SortTypes } from '~types/todo.types';
import { idSorting } from '~utils/idSorting';
import { nameSorting } from '~utils/nameSorting';
import { selectSorting } from '~utils/selectSorting';
import { statusSorting } from '~utils/statusSorting';
import { TodoState } from '..';
import todoSelectors from '../todo.selectors';

describe('Todo selectors', () => {
  let getStateMock: AppState;
  let state: TodoState;

  beforeEach(() => {
    state = {
      loading: false,
      error: 'Error happend',
      cursor: 0,
      todos: [
        {
          id: 1,
          userId: 1,
          title: 'add new todo',
          completed: true,
        },
        {
          id: 2,
          userId: 2,
          title: 'read a book',
          completed: false,
        },
      ],
      editingMode: false,
      editingTodos: [
        {
          id: 2,
          userId: 2,
          title: 'todo2',
          completed: true,
        },
      ],
      editingInput: 'read a book',
      filterMode: SortTypes.DEFAULT,
      allTodosCount: 2,
      limit: 30,
      skip: 10,
      deletedTodosBeforeNewPage: 2,
    };
    getStateMock = {
      todo: state,
    };
  });

  it('todo loading should be fetched', () => {
    expect(todoSelectors.loading(getStateMock)).toBe(state.loading);
  });

  it('todo error should be fetched', () => {
    expect(todoSelectors.error(getStateMock)).toBe(state.error);
  });

  it('todo cursor should be fetched', () => {
    expect(todoSelectors.cursor(getStateMock)).toBe(state.cursor);
  });

  it('todo editingMode should be fetched', () => {
    expect(todoSelectors.editingMode(getStateMock)).toBe(state.editingMode);
  });

  it('todo editingTodos should be fetched', () => {
    expect(todoSelectors.editingTodos(getStateMock)).toBe(state.editingTodos);
  });

  it('todo editingInput should be fetched', () => {
    expect(todoSelectors.editingInput(getStateMock)).toBe(state.editingInput);
  });

  it('todo filterMode should be fetched', () => {
    expect(todoSelectors.filterMode(getStateMock)).toBe(state.filterMode);
  });

  it('todo allTodosCount should be fetched', () => {
    expect(todoSelectors.allTodosCount(getStateMock)).toBe(state.allTodosCount);
  });

  it('todo isListInitializing should be fetched', () => {
    const stateWithoutInitializing = {
      todo: {
        ...state,
        loading: true,
      },
    };
    const stateWithInitializing = {
      todo: {
        ...state,
        loading: true,
        todos: [],
      },
    };

    expect(todoSelectors.isListInitializing(getStateMock)).toBeFalsy();
    expect(todoSelectors.isListInitializing(stateWithoutInitializing)).toBeFalsy();
    expect(todoSelectors.isListInitializing(stateWithInitializing)).toBeTruthy();
  });

  it('todo page should be fetched', () => {
    const page = state.skip / state.limit + 1;
    const stateWithFirstPage = {
      todo: {
        ...state,
        skip: 0,
      },
    };

    expect(todoSelectors.page(getStateMock)).toBe(page);
    expect(todoSelectors.page(stateWithFirstPage)).toBe(1);
  });

  it('properly filtered todos should be fetched', () => {
    const filterPicker = (filter: SortTypes) => {
      return {
        todo: {
          ...state,
          filterMode: filter,
        },
      };
    };

    const todosList = [...state.todos];
    const edidtinTodos = state.editingTodos;
    const notEditingTodos = todosList.filter(
      (todo) => !edidtinTodos.some((eTodo) => eTodo.id === todo.id),
    );

    expect(todoSelectors.todos(getStateMock)).toEqual(state.todos);
    expect(todoSelectors.todos(filterPicker(SortTypes.ID_ASC))).toEqual(
      idSorting(SortTypes.ID_ASC, state.todos),
    );
    expect(todoSelectors.todos(filterPicker(SortTypes.ID_DESC))).toEqual(
      idSorting(SortTypes.ID_DESC, state.todos),
    );
    expect(todoSelectors.todos(filterPicker(SortTypes.NAME_ASC))).toEqual(
      nameSorting(SortTypes.NAME_ASC, state.todos),
    );
    expect(todoSelectors.todos(filterPicker(SortTypes.NAME_DESC))).toEqual(
      nameSorting(SortTypes.NAME_DESC, state.todos),
    );
    expect(todoSelectors.todos(filterPicker(SortTypes.STATUS_ASC))).toEqual(
      statusSorting(SortTypes.STATUS_ASC, state.todos),
    );
    expect(todoSelectors.todos(filterPicker(SortTypes.STATUS_DESC))).toEqual(
      statusSorting(SortTypes.STATUS_DESC, state.todos),
    );
    expect(todoSelectors.todos(filterPicker(SortTypes.SELECT_ASC))).toEqual(
      selectSorting(SortTypes.SELECT_ASC, edidtinTodos, notEditingTodos),
    );
    expect(todoSelectors.todos(filterPicker(SortTypes.SELECT_DESC))).toEqual(
      selectSorting(SortTypes.SELECT_DESC, edidtinTodos, notEditingTodos),
    );
  });
});
