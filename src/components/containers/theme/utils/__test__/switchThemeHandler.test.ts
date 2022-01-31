import { switchThemeHandler } from '../switchThemeHandler';

describe('AddTodoHandler from util', () => {
  it('addTodoHandler should fire dispatch and clearForm callbacks when form value is true', () => {
    // Given
    const dispatchClb = jest.fn();
    // When
    switchThemeHandler(dispatchClb);
    // Then
    expect(dispatchClb).toHaveBeenCalled();
  });
});
