import { KeyboardStatic } from 'react-native';
import { clearFormHandler } from '../clearFormHandler';

describe('ClearFormHandler form util', () => {
  it('clearFormHandler should emptify useState callback and hide keyboard', () => {
    // Given
    const useStateChangeMock = jest.fn();
    const dismissKeyboardObjectMock = jest.fn();
    const mockKeyboardObject = {
      dismiss: dismissKeyboardObjectMock,
    } as unknown as KeyboardStatic;
    // When
    clearFormHandler(useStateChangeMock, mockKeyboardObject)();
    // Then
    expect(useStateChangeMock).toHaveBeenCalledWith('');
    expect(dismissKeyboardObjectMock).toHaveBeenCalled();
  });
});
