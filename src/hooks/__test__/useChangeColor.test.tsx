import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent } from '@testing-library/react-native';

import { Header } from '~components/header';
import globalStyles from '~global/constants.style';
import { TitleSVG } from '~components/common/svg';

describe('Change color hook', () => {
  globalStyles.HEADER_COLOR_1 = '#111';
  globalStyles.HEADER_COLOR_2 = '#222';
  globalStyles.HEADER_COLOR_3 = '#333';
  globalStyles.HEADER_COLOR_4 = '#444';
  globalStyles.HEADER_COLOR_5 = '#555';
  globalStyles.HEADER_COLOR_6 = '#666';
  globalStyles.HEADER_COLOR_7 = '#777';

  it('change color hook should return proper color in order', () => {
    // Given
    const tree = renderer.create(<Header />);
    const button = tree.root.findByProps({ accessibilityRole: 'button' });
    // Then
    expect(tree.root.findByType(TitleSVG).props.color).toBe(globalStyles.HEADER_COLOR_1);
    fireEvent.press(button);
    expect(tree.root.findByType(TitleSVG).props.color).toBe(globalStyles.HEADER_COLOR_2);
    fireEvent.press(button);
    expect(tree.root.findByType(TitleSVG).props.color).toBe(globalStyles.HEADER_COLOR_3);
    fireEvent.press(button);
    expect(tree.root.findByType(TitleSVG).props.color).toBe(globalStyles.HEADER_COLOR_4);
    fireEvent.press(button);
    expect(tree.root.findByType(TitleSVG).props.color).toBe(globalStyles.HEADER_COLOR_5);
    fireEvent.press(button);
    expect(tree.root.findByType(TitleSVG).props.color).toBe(globalStyles.HEADER_COLOR_6);
    fireEvent.press(button);
    expect(tree.root.findByType(TitleSVG).props.color).toBe(globalStyles.HEADER_COLOR_7);
    fireEvent.press(button);
    expect(tree.root.findByType(TitleSVG).props.color).toBe(globalStyles.HEADER_COLOR_1);
  });
});
