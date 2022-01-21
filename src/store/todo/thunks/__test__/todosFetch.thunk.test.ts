import apiService from '~services/api.service';
import { TodoState } from '~store/todo';
import { SortTypes } from '~types/todo.types';
import { todoActions } from '../../actions';
import { todosFetchThunk } from '../todosFetch.thunk';

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

describe('Fetch todo thunk', () => {
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  let state: TodoState;

  const requestMock = {
    todos: [{ id: 1, userId: 1, title: 'todo', completed: true }],
    count: 100,
  };

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

  afterEach(() => {
    jest.useRealTimers();
  });

  it('dispatches and api in fetch todo thunk should be called right times and with proper arguments', async () => {
    // When
    apiServiceMock.get.mockResolvedValue(requestMock);
    const thunk = todosFetchThunk();
    await thunk(dispatchMock, getStateMock);
    // Then
    expect(dispatchMock).toBeCalledTimes(2);
    expect(apiServiceMock.get).toHaveBeenCalledWith('/todos', {
      limit: state.limit + state.deletedTodosBeforeNewPage,
      skip: state.skip - state.deletedTodosBeforeNewPage,
    });
    expect(dispatchMock).toHaveBeenNthCalledWith(1, todoActions.todosFetchRequested());
    expect(dispatchMock).toHaveBeenNthCalledWith(
      2,
      todoActions.todosFetchSuccessful({ todos: requestMock.todos, count: requestMock.count }),
    );
  });

  it('dispatches and api in fetch todo thunk should be called right times and with proper arguments when error', async () => {
    const error = 'error happened';
    // When
    apiServiceMock.get.mockRejectedValue(new Error(error));
    const thunk = todosFetchThunk();
    await thunk(dispatchMock, getStateMock);
    // Then
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, todoActions.todosFetchRequested());
    expect(dispatchMock).toHaveBeenNthCalledWith(2, todoActions.todosFetchFailed(error));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, todoActions.todoEmptifyError());
  });
});
