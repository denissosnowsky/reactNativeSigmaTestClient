import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { render, cleanup } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import { BlueText } from '..';

afterEach(cleanup);

describe('Text component', () => {
  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };
  it('text should render proper children', () => {
    // Given
    const text = 'text';
    // When
    const { queryByText } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <BlueText>{text}</BlueText>
      </NativeBaseProvider>,
    );
    // Then
    expect(queryByText(text)).toBeTruthy();
  });

  it('text should render have style', () => {
    // Given
    const fontSize = 20;
    // When
    const { queryByText } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <BlueText fs={fontSize}>text</BlueText>
      </NativeBaseProvider>,
    );
    // Then
    expect(queryByText('text')).toHaveStyle({ fontSize });
    expect(queryByText('text')).toHaveStyle({ lineHeight: fontSize });
  });
});
