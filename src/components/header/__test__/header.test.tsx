import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import { Header } from '..';

afterEach(cleanup);

describe('Header component', () => {
  it('Header component should be like snapshot', () => {
    // When
    const tree = render(<Header />);
    // Then
    expect(tree).toBeDefined();
  });
});
