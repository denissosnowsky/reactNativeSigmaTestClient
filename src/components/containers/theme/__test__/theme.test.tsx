import React from 'react';
import { AnyAction, Store } from '@reduxjs/toolkit';
import { cleanup, fireEvent } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { Ionicons } from '@expo/vector-icons';

import { ThemeState } from '~store/theme';
import { switchThemeHandler } from '../utils/switchThemeHandler';
import { Theme } from '..';

afterEach(cleanup);

jest.mock('../utils/switchThemeHandler');

let state: ThemeState;
let store: Store<any, AnyAction>;
const mockStore = configureStore();

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe('theme component', () => {
  beforeEach(() => {
    state = {
      isLightMode: true,
    };
    store = mockStore(state);
    const getStateMethod = () => ({
      todo: state,
    });
    store.getState = getStateMethod;
  });

  it('theme components should show propper mode button when light mode on', () => {
    // Given
    const spyDispatch = jest.spyOn(redux, 'useDispatch');
    spyDispatch.mockReturnValue(jest.fn());
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValueOnce(true);
    // When
    const tree = renderer.create(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <Theme />
        </Provider>
      </NativeBaseProvider>,
    );
    // Then
    const button = tree.root.findByType(Ionicons);
    expect(button.props.name).toBe('md-sunny');
    // When
    fireEvent.press(button);
    // Then
    expect(switchThemeHandler).toHaveBeenCalled();
  });

  it('theme components should show propper mode button when dark mode on', () => {
    // Given
    const spyDispatch = jest.spyOn(redux, 'useDispatch');
    spyDispatch.mockReturnValue(jest.fn());
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValueOnce(false);
    // When
    const tree = renderer.create(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <Theme />
        </Provider>
      </NativeBaseProvider>,
    );
    // Then
    const button = tree.root.findByType(Ionicons);
    expect(button.props.name).toBe('moon');
    // When
    fireEvent.press(button);
    // Then
    expect(switchThemeHandler).toHaveBeenCalled();
  });
});
