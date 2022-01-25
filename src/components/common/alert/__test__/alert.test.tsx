import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { render, cleanup } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import { Alert } from '..';

afterEach(cleanup);

describe('Alert component', () => {
  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };
  it('alert should show the proper text', () => {
    // Given
    const text = 'Error happened';
    // When
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Alert status="info" text={text} isShown />
      </NativeBaseProvider>,
    );
    // Then
    expect(queryByTestId('text')).toHaveTextContent(text);
  });

  it('alert should be shown with true isShown prop', () => {
    // When
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Alert status="info" text="Text" isShown />
      </NativeBaseProvider>,
    );
    // Then
    expect(queryByTestId('alert-wrapper')).toHaveStyle({ display: 'flex' });
  });

  it('alert shouldn"t be shown with false isShown prop', () => {
    // When
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Alert status="info" text="Text" isShown={false} />
      </NativeBaseProvider>,
    );
    // Then
    expect(queryByTestId('alert-wrapper')).toHaveStyle({ display: 'none' });
  });

  it('alert should show proper status', () => {
    // Given
    const uiKitBGColors: Array<{
      status: 'info' | 'error' | 'success' | 'warning';
      color: string;
    }> = [
      { status: 'info', color: '#e0f2fe' },
      { status: 'error', color: '#ffe4e6' },
      { status: 'success', color: '#d1fae5' },
      { status: 'warning', color: '#ffedd5' },
    ];
    // When
    const { getAllByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Alert status={uiKitBGColors[0].status} text="Text" isShown />
        <Alert status={uiKitBGColors[1].status} text="Text" isShown />
        <Alert status={uiKitBGColors[2].status} text="Text" isShown />
        <Alert status={uiKitBGColors[3].status} text="Text" isShown />
      </NativeBaseProvider>,
    );
    // Then
    const alerts = getAllByTestId('alert-wrapper');
    expect(alerts[0].props.style[0].backgroundColor).toBe(uiKitBGColors[0].color);
    expect(alerts[1].props.style[0].backgroundColor).toBe(uiKitBGColors[1].color);
    expect(alerts[2].props.style[0].backgroundColor).toBe(uiKitBGColors[2].color);
    expect(alerts[3].props.style[0].backgroundColor).toBe(uiKitBGColors[3].color);
  });
});
