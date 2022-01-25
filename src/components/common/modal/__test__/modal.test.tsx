import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import { ModalFC } from '..';

afterEach(cleanup);

describe('Modal component', () => {
  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };
  it('modal should show proper multiple number', () => {
    // Given
    const itemsQuantityMultiple = 5;
    const mockFc = jest.fn();
    // When
    const { queryByText } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <ModalFC
          itemsQuantity={itemsQuantityMultiple}
          confirm={mockFc}
          decline={mockFc}
          showModal
          closeModal={mockFc}
        />
      </NativeBaseProvider>,
    );
    // Then
    expect(queryByText(`Delete ${itemsQuantityMultiple} todos?`)).toBeTruthy();
  });

  it('modal should show proper one number', () => {
    // Given
    const itemsQuantityOne = 1;
    const mockFc = jest.fn();
    // When
    const { queryByText } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <ModalFC
          itemsQuantity={itemsQuantityOne}
          confirm={mockFc}
          decline={mockFc}
          showModal
          closeModal={mockFc}
        />
      </NativeBaseProvider>,
    );
    // Then
    expect(queryByText(`Delete ${itemsQuantityOne} todo?`)).toBeTruthy();
  });

  it('modal should fire two callbacks', () => {
    // Given
    const confirmMock = jest.fn();
    const declineMock = jest.fn();
    const closeMock = jest.fn();
    // When
    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <ModalFC
          itemsQuantity={1}
          confirm={confirmMock}
          decline={declineMock}
          showModal
          closeModal={closeMock}
        />
      </NativeBaseProvider>,
    );
    fireEvent.press(getByTestId('yes'));
    fireEvent.press(getByTestId('no'));
    // Then
    expect(confirmMock).toHaveBeenCalled();
    expect(declineMock).toHaveBeenCalled();
  });
});
