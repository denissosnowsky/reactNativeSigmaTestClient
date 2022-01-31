import { AppState } from '~store';
import { TodoState } from '~store/todo';
import { SortTypes } from '~types/todo.types';
import { ThemeState } from '..';
import themeSelectors from '../theme.selectors';

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

  it('theme isLightMode should be fetched', () => {
    expect(themeSelectors.isLightMode(getStateMock)).toBeTruthy();
  });
});
