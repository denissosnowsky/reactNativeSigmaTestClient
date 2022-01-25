import apiService from '~services/api.service';
import { todoActions } from '../../actions';
import { todoDeleteThunk } from '../todoDelete.thunk';

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

describe('Delete todo thunk', () => {
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  const todoList = [
    {
      userId: 1,
      id: 1,
      title: 'todo1',
      completed: false,
    },
    {
      userId: 2,
      id: 2,
      title: 'todo2',
      completed: false,
    },
  ];

  let idsList: number[];

  beforeEach(async () => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    idsList = todoList.map((todo) => todo.id);
  });

  it('dispatches and api in delete todo thunk should be called right times and with proper arguments', async () => {
    // When
    apiServiceMock.delete.mockResolvedValue(undefined);
    const thunk = todoDeleteThunk(todoList);
    await thunk(dispatchMock, getStateMock);
    // Then
    expect(dispatchMock).toBeCalledTimes(2);
    expect(apiServiceMock.delete).toHaveBeenCalledWith(
      `/todos/delete?${idsList.map((id) => `id=${id}&`).join('')}`,
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(1, todoActions.todoDeleteRequested(idsList));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, todoActions.todoDeleteSuccessful(idsList));
  });

  it('dispatches and api in delete todo thunk should be called right times and with proper arguments when error', async () => {
    const error = 'error happened';
    // When
    apiServiceMock.delete.mockRejectedValue(new Error(error));
    const thunk = todoDeleteThunk(todoList);
    await thunk(dispatchMock, getStateMock);
    // Then
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, todoActions.todoDeleteRequested(idsList));
    expect(dispatchMock).toHaveBeenNthCalledWith(
      2,
      todoActions.todoDeleteFailed({ error, ids: idsList }),
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(3, todoActions.todoEmptifyError());
  });
});
