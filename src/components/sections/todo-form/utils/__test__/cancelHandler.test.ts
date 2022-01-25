import { cancelHandler } from '../cancelHandler';

describe('CancelHandler form util', () => {
  it('cancelHandler should fire dispatch and clearForm callbacks', () => {
    // Given
    const dispatchClb = jest.fn();
    const clearFormHandler = jest.fn();
    const closeModal = jest.fn();
    // When
    cancelHandler(dispatchClb, clearFormHandler, closeModal);
    // Then
    expect(dispatchClb).toHaveBeenCalled();
    expect(clearFormHandler).toHaveBeenCalled();
    expect(closeModal).toHaveBeenCalledWith(false);
  });
});
