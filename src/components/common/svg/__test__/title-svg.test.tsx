import React from 'react';
import renderer from 'react-test-renderer';
import Svg from 'react-native-svg';

import { TitleSVG } from '~components/common/svg';

describe('svg components', () => {
  it('title-svg should be colored in the color given in props', () => {
    // Given
    const color = 'red';
    const tree = renderer.create(<TitleSVG color={color} />);
    // Then
    expect(tree.root.findByType(Svg).props.fill).toBe(color);
  });

  it('title-svg should be colored in black when color prop is not given', () => {
    // Given
    const tree = renderer.create(<TitleSVG />);
    // Then
    expect(tree.root.findByType(Svg).props.fill).toBe('#000');
  });
});
