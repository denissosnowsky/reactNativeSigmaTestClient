import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import globalStyles from '~global/constants.style';
import { Input } from '..';

afterEach(cleanup);

describe('Input component', () => {
  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };
  it('input should have proper placeholder from props', () => {
    // Given
    const placeholder = 'placeholder';
    // When
    const { getByPlaceholderText } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Input placeholder={placeholder} onChange={jest.fn()} />
      </NativeBaseProvider>,
    );
    // Then
    expect(getByPlaceholderText(placeholder)).toBeTruthy();
  });

  it('input should have proper value depending on props', () => {
    // Given
    const value = 'value';
    const placeholder = 'placeholder';
    // When
    const { getAllByPlaceholderText } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Input placeholder={placeholder} onChange={jest.fn()} value={value} />
        <Input placeholder={placeholder} onChange={jest.fn()} />
      </NativeBaseProvider>,
    );
    const inputs = getAllByPlaceholderText(placeholder);
    // Then
    expect(inputs[0]).toHaveProp('value', value);
    expect(inputs[1]).toHaveProp('value', '');
  });

  it('input should be underilned depending on props', () => {
    // Given
    const placeholder = 'placeholder';
    // When
    const { getByPlaceholderText } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Input placeholder={placeholder} onChange={jest.fn()} underlined />
      </NativeBaseProvider>,
    );
    // Then
    expect(getByPlaceholderText(placeholder)).toHaveStyle({
      borderBottomColor: globalStyles.LIGHT_BORDER_COLOR,
    });
  });

  it('input should fire callback and have new value while writitng', () => {
    // Given
    const placeholder = 'placeholder';
    const callbackMock = jest.fn();
    const value = 'new todo';
    // When
    const { getByPlaceholderText } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Input placeholder={placeholder} onChange={callbackMock} underlined />
      </NativeBaseProvider>,
    );
    const input = getByPlaceholderText(placeholder);
    fireEvent.changeText(input, value);
    // Then
    expect(callbackMock).toHaveBeenCalledWith(value);
    expect(input).toHaveProp('value', value);
  });
});
