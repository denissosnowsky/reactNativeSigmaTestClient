import { onCheckPressHandle } from '../onCheckPressHandle';

describe('onCheckPressHandle', () => {
  it('onCheckPressHandle should fire callback', () => {
    // Getting
    const mockCallback = jest.fn();
    // When
    onCheckPressHandle(mockCallback);
    // Then
    expect(mockCallback).toHaveBeenCalled();
  });
});
