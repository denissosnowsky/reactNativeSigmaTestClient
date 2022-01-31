import { deleteTodoHandler } from '../deleteTodoHandler';

describe('CancelHandler from util', () => {
  it('cancelHandler should fire dispatch and clearForm callbacks', () => {
    // Given
    const dispatchClb = jest.fn();
    const clearFormHandler = jest.fn();
    const closeModal = jest.fn();
    // When
    deleteTodoHandler(dispatchClb, clearFormHandler, closeModal);
    // Then
    expect(dispatchClb).toHaveBeenCalled();
    expect(clearFormHandler).toHaveBeenCalled();
    expect(closeModal).toHaveBeenCalledWith(false);
  });
});
