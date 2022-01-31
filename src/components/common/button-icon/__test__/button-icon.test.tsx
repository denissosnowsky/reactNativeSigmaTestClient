import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import renderer from 'react-test-renderer';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ButtonIcon } from '..';

afterEach(cleanup);

describe('Button with icon', () => {
  it('button should fire the callback when pressed', async () => {
    // Given
    const mockCallback = jest.fn();
    const { getByA11yRole } = render(<ButtonIcon onPress={mockCallback} variant="add" />);
    const button = getByA11yRole('button');
    // When
    fireEvent.press(button);
    // Then
    expect(mockCallback).toBeCalled();
  });

  it('button should render add icon when add variant', async () => {
    // Given
    const tree = renderer.create(<ButtonIcon onPress={jest.fn()} variant="add" />);
    // Then
    expect(tree.root.findByType(MaterialCommunityIcons).props.name).toBe('plus-circle');
  });

  it('button should render delete icon when delete variant', async () => {
    // Given
    const tree = renderer.create(<ButtonIcon onPress={jest.fn()} variant="delete" />);
    // Then
    expect(tree.root.findByType(MaterialCommunityIcons).props.name).toBe('delete-circle');
  });

  it('button should render save icon when save variant', async () => {
    // Given
    const tree = renderer.create(<ButtonIcon onPress={jest.fn()} variant="save" />);
    // Then
    expect(tree.root.findByType(MaterialCommunityIcons).props.name).toBe('content-save');
  });

  it('button should render cancel icon when cancel variant', async () => {
    // Given
    const tree = renderer.create(<ButtonIcon onPress={jest.fn()} variant="cancel" />);
    // Then
    expect(tree.root.findByType(MaterialCommunityIcons).props.name).toBe('cancel');
  });

  it('button should render select-all icon when select-all variant', async () => {
    // Given
    const tree = renderer.create(<ButtonIcon onPress={jest.fn()} variant="select-all" />);
    // Then
    expect(tree.root.findByType(MaterialCommunityIcons).props.name).toBe(
      'checkbox-multiple-marked-circle',
    );
  });
});
