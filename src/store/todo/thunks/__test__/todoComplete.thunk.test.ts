import apiService from '~services/api.service';
import { todoActions } from '../../actions';
import { todoCompleteThunk } from '../todoComplete.thunk';

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

describe('Complete todo thunk', () => {
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  const idParam = 1;

  beforeEach(async () => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
  });

  it('dispatches and api in complete todo thunk should be called right times and with proper arguments', async () => {
    // When
    apiServiceMock.put.mockResolvedValue(undefined);
    const thunk = todoCompleteThunk(idParam);
    await thunk(dispatchMock, getStateMock);
    // Then
    expect(dispatchMock).toBeCalledTimes(2);
    expect(apiServiceMock.put).toHaveBeenCalledWith(`/todos/${idParam}`);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, todoActions.todoCompleteRequested(idParam));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, todoActions.todoCompleteSuccessful(idParam));
  });

  it('dispatches and api in complete todo thunk should be called right times and with proper arguments when error', async () => {
    const error = 'error happened';
    // When
    apiServiceMock.put.mockRejectedValue(new Error(error));
    const thunk = todoCompleteThunk(idParam);
    await thunk(dispatchMock, getStateMock);
    // Then
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, todoActions.todoCompleteRequested(idParam));
    expect(dispatchMock).toHaveBeenNthCalledWith(
      2,
      todoActions.todoCompleteFailed({ error, id: idParam }),
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(3, todoActions.todoEmptifyError());
  });
});
