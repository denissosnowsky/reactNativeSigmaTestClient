import React from 'react';
import { cleanup } from '@testing-library/react-native';
import renderer, { act, create } from 'react-test-renderer';
import '@testing-library/jest-native/extend-expect';
import { Text } from 'react-native';

import { ErrorBoundary } from '..';

afterEach(cleanup);

describe('Error boundary component', () => {
  it('error boundary should"t have error by default and render children', () => {
    // Given
    const children = <Text>children</Text>;
    // When
    const tree = renderer.create(<ErrorBoundary>{children}</ErrorBoundary>);
    const instance = tree.root.instance;
    // Then
    expect(instance.state.hasError).toBeFalsy();
    expect(instance.props.children).toEqual(children);
    tree.unmount();
  });

  it('error boundary should have error after triggering its getDerivedStateFromError method', () => {
    // When
    const tree = renderer.create(<ErrorBoundary>children</ErrorBoundary>);
    const instance = tree.root.instance;
    const newState = instance._reactInternals.elementType.getDerivedStateFromError();
    // Then
    expect(newState.hasError).toBeTruthy();
    tree.unmount();
  });

  it('error boundary should have error after when children throws error', () => {
    // Given
    const Children = () => {
      throw new Error();
    };
    // When
    const tree = renderer.create(
      <ErrorBoundary>
        <Children />
      </ErrorBoundary>,
    );
    const instance = tree.root.instance;
    // Then
    expect(instance.state.hasError).toBeTruthy();
    expect(tree.root.findAllByType(Text).length).toBe(2);
    tree.unmount();
  });
});
