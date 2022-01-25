import apiService from '~services/api.service';
import { TodoState } from '~store/todo';
import { SortTypes } from '~types/todo.types';
import { todoActions } from '../../actions';
import { todoAddThunk } from '../todoAdd.thunk';

jest.mock('~services/api.service');
const apiServiceMock = apiService as jest.Mocked<typeof apiService>;

jest.mock('expo-constants', () => ({
  Constants: {
    manifest: {
      extra: {
        prod_url: 'http://prod-server.com',
        dev_url: 'http://dev-server.com',
      },
    },
  },
}));

describe('Add todo thunk', () => {
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  const todoRequest = { userId: 1, title: 'read a book' };
  const todoResponse = { userId: 1, id: 1, title: 'read a book', completed: true };

  let state: TodoState;

  beforeEach(async () => {
    state = {
      loading: false,
      error: '',
      cursor: 1,
      todos: [],
      editingMode: false,
      editingTodos: [],
      editingInput: '',
      filterMode: SortTypes.DEFAULT,
      allTodosCount: 0,
      limit: 30,
      skip: 0,
      deletedTodosBeforeNewPage: 0,
    };
    dispatchMock.mockClear();
    getStateMock.mockClear().mockReturnValue({
      todo: state,
    });
  });

  it('dispatches and api in add todo thunk should be called right times and with proper arguments', async () => {
    // When
    apiServiceMock.post.mockResolvedValue(todoResponse);
    const thunk = todoAddThunk(todoRequest);
    await thunk(dispatchMock, getStateMock);
    // Then
    expect(dispatchMock).toBeCalledTimes(2);
    expect(apiServiceMock.post).toHaveBeenCalledWith('/todos', {
      ...todoRequest,
      id: state.cursor + 1,
    });
    expect(dispatchMock).toHaveBeenNthCalledWith(
      1,
      todoActions.todoAddRequested({ ...todoRequest, id: state.cursor + 1, completed: false }),
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(2, todoActions.todoAddSuccessful(todoResponse));
  });

  it('dispatches and api in add todo thunk should be called right times and with proper arguments when error', async () => {
    const error = 'error happened';
    // When
    apiServiceMock.post.mockRejectedValue(new Error(error));
    const thunk = todoAddThunk(todoRequest);
    await thunk(dispatchMock, getStateMock);
    // Then
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(
      1,
      todoActions.todoAddRequested({ ...todoRequest, id: state.cursor + 1, completed: false }),
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
      2,
      todoActions.todoAddFailed({ error, id: state.cursor + 1 }),
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(3, todoActions.todoEmptifyError());
  });
});
