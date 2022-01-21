import { dispatchSelection } from '../dispatchSelection';

describe('dispatchSelection', () => {
  it('dispatchSelection should return callback which dispatched action', () => {
    // Given
    const mockDispatch = jest.fn();
    const mockActionCreator = {
      type: 'type',
    };
    // When
    const newCallback = dispatchSelection(mockDispatch, mockActionCreator);
    newCallback();
    // Then
    expect(mockDispatch).toHaveBeenCalledWith(mockActionCreator);
  });
});
