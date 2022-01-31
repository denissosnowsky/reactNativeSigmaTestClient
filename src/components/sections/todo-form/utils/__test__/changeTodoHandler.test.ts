import { changeTodoHandler } from '../changeTodoHandler';

describe('ChangeHandler from util', () => {
  it('changeTodoHandler should fire dispatch and clearForm callbacks', () => {
    // Given
    const dispatchClb = jest.fn();
    const clearFormHandler = jest.fn();
    // When
    changeTodoHandler(dispatchClb, clearFormHandler);
    // Then
    expect(dispatchClb).toHaveBeenCalled();
    expect(clearFormHandler).toHaveBeenCalled();
  });
});
