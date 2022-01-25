import apiService from '~services/api.service';
import { todoActions } from '../../actions';
import { todoGetCursorThunk } from '../todoGetCursor.thunk';

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

describe('GetCursor todo thunk', () => {
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  const cursorMock = 10;

  beforeEach(async () => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
  });

  it('dispatches and api in getCursor todo thunk should be called right times and with proper arguments', async () => {
    // When
    apiServiceMock.get.mockResolvedValue(cursorMock);
    const thunk = todoGetCursorThunk();
    await thunk(dispatchMock, getStateMock);
    // Then
    expect(dispatchMock).toBeCalledTimes(2);
    expect(apiServiceMock.get).toHaveBeenCalledWith('/todos/cursor');
    expect(dispatchMock).toHaveBeenNthCalledWith(1, todoActions.todoGetCoursorRequested());
    expect(dispatchMock).toHaveBeenNthCalledWith(
      2,
      todoActions.todoGetCoursorSuccessful(cursorMock),
    );
  });

  it('dispatches and api in getCursor todo thunk should be called right times and with proper arguments when error', async () => {
    const error = 'error happened';
    // When
    apiServiceMock.get.mockRejectedValue(new Error(error));
    const thunk = todoGetCursorThunk();
    await thunk(dispatchMock, getStateMock);
    // Then
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, todoActions.todoGetCoursorRequested());
    expect(dispatchMock).toHaveBeenNthCalledWith(2, todoActions.todoGetCoursorFailed(error));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, todoActions.todoEmptifyError());
  });
});
