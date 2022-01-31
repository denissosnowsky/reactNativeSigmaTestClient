import { AppState } from '~store';
import { ThemeState } from '~store/theme';
import { SortTypes } from '~types/todo.types';
import { idSorting } from '~utils/idSorting';
import { nameSorting } from '~utils/nameSorting';
import { selectSorting } from '~utils/selectSorting';
import { statusSorting } from '~utils/statusSorting';
import { TodoState } from '..';
import todoSelectors from '../todo.selectors';

describe('Todo selectors', () => {
  let getStateMock: AppState;
  let todoState: TodoState;
  let themeState: ThemeState;

  beforeEach(() => {
    todoState = {
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
    themeState = {
      isLightMode: true,
    };
    getStateMock = {
      todo: todoState,
      theme: themeState,
    };
  });

  it('todo loading should be fetched', () => {
    expect(todoSelectors.loading(getStateMock)).toBe(todoState.loading);
  });

  it('todo error should be fetched', () => {
    expect(todoSelectors.error(getStateMock)).toBe(todoState.error);
  });

  it('todo cursor should be fetched', () => {
    expect(todoSelectors.cursor(getStateMock)).toBe(todoState.cursor);
  });

  it('todo editingMode should be fetched', () => {
    expect(todoSelectors.editingMode(getStateMock)).toBe(todoState.editingMode);
  });

  it('todo editingTodos should be fetched', () => {
    expect(todoSelectors.editingTodos(getStateMock)).toBe(todoState.editingTodos);
  });

  it('todo editingInput should be fetched', () => {
    expect(todoSelectors.editingInput(getStateMock)).toBe(todoState.editingInput);
  });

  it('todo filterMode should be fetched', () => {
    expect(todoSelectors.filterMode(getStateMock)).toBe(todoState.filterMode);
  });

  it('todo allTodosCount should be fetched', () => {
    expect(todoSelectors.allTodosCount(getStateMock)).toBe(todoState.allTodosCount);
  });

  it('todo isListInitializing should be fetched', () => {
    const stateWithoutInitializing = {
      todo: {
        ...todoState,
        loading: true,
      },
      theme: themeState,
    };
    const stateWithInitializing = {
      todo: {
        ...todoState,
        loading: true,
        todos: [],
      },
      theme: themeState,
    };

    expect(todoSelectors.isListInitializing(getStateMock)).toBeFalsy();
    expect(todoSelectors.isListInitializing(stateWithoutInitializing)).toBeFalsy();
    expect(todoSelectors.isListInitializing(stateWithInitializing)).toBeTruthy();
  });

  it('todo page should be fetched', () => {
    const page = todoState.skip / todoState.limit + 1;
    const stateWithFirstPage = {
      todo: {
        ...todoState,
        skip: 0,
      },
      theme: themeState,
    };

    expect(todoSelectors.page(getStateMock)).toBe(page);
    expect(todoSelectors.page(stateWithFirstPage)).toBe(1);
  });

  it('properly filtered todos should be fetched', () => {
    const filterPicker = (filter: SortTypes) => {
      return {
        todo: {
          ...todoState,
          filterMode: filter,
        },
        theme: themeState,
      };
    };

    const todosList = [...todoState.todos];
    const edidtinTodos = todoState.editingTodos;
    const notEditingTodos = todosList.filter(
      (todo) => !edidtinTodos.some((eTodo) => eTodo.id === todo.id),
    );

    expect(todoSelectors.todos(getStateMock)).toEqual(todoState.todos);
    expect(todoSelectors.todos(filterPicker(SortTypes.ID_ASC))).toEqual(
      idSorting(SortTypes.ID_ASC, todoState.todos),
    );
    expect(todoSelectors.todos(filterPicker(SortTypes.ID_DESC))).toEqual(
      idSorting(SortTypes.ID_DESC, todoState.todos),
    );
    expect(todoSelectors.todos(filterPicker(SortTypes.NAME_ASC))).toEqual(
      nameSorting(SortTypes.NAME_ASC, todoState.todos),
    );
    expect(todoSelectors.todos(filterPicker(SortTypes.NAME_DESC))).toEqual(
      nameSorting(SortTypes.NAME_DESC, todoState.todos),
    );
    expect(todoSelectors.todos(filterPicker(SortTypes.STATUS_ASC))).toEqual(
      statusSorting(SortTypes.STATUS_ASC, todoState.todos),
    );
    expect(todoSelectors.todos(filterPicker(SortTypes.STATUS_DESC))).toEqual(
      statusSorting(SortTypes.STATUS_DESC, todoState.todos),
    );
    expect(todoSelectors.todos(filterPicker(SortTypes.SELECT_ASC))).toEqual(
      selectSorting(SortTypes.SELECT_ASC, edidtinTodos, notEditingTodos),
    );
    expect(todoSelectors.todos(filterPicker(SortTypes.SELECT_DESC))).toEqual(
      selectSorting(SortTypes.SELECT_DESC, edidtinTodos, notEditingTodos),
    );
  });
});
