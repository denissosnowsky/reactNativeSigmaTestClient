import { addTodoHandler } from '../addTodoHandler';

describe('AddTodoHandler form util', () => {
  it('addTodoHandler should fire dispatch and clearForm callbacks when form value is true', () => {
    // Given
    const formValue = 'value';
    const dispatchClb = jest.fn();
    const clearFormHandler = jest.fn();
    // When
    addTodoHandler(formValue, dispatchClb, clearFormHandler);
    // Then
    expect(dispatchClb).toHaveBeenCalled();
    expect(clearFormHandler).toHaveBeenCalled();
  });

  it('addTodoHandler shouldn"t fire dispatch and clearForm callbacks when form value is empty', () => {
    // Given
    const formValue = '';
    const dispatchClb = jest.fn();
    const clearFormHandler = jest.fn();
    // When
    addTodoHandler(formValue, dispatchClb, clearFormHandler);
    // Then
    expect(dispatchClb).not.toHaveBeenCalled();
    expect(clearFormHandler).not.toHaveBeenCalled();
  });
});
