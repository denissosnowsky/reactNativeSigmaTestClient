import { selectAllTodosHandler } from '../selectAllTodosHandler';

describe('SelectAllHandler from util', () => {
  it('selectAllHandler should fire dispatch', () => {
    // Given
    const dispatchClb = jest.fn();
    // When
    selectAllTodosHandler(dispatchClb);
    // Then
    expect(dispatchClb).toHaveBeenCalled();
  });
});
