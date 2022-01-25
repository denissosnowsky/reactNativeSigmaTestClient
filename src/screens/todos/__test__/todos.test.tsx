import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AnyAction, Store } from '@reduxjs/toolkit';
import * as redux from 'react-redux';
import { NativeBaseProvider } from 'native-base';

import { TodoState } from '~store/todo';
import { SortTypes } from '~types/todo.types';
import { Todos } from '..';

afterEach(cleanup);

let state: TodoState;
let store: Store<any, AnyAction>;
const mockStore = configureStore();

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe('Todos screen', () => {
  beforeEach(() => {
    state = {
      loading: false,
      error: '',
      cursor: 0,
      todos: [],
      editingMode: false,
      editingTodos: [],
      editingInput: '',
      filterMode: SortTypes.DEFAULT,
      allTodosCount: 0,
      limit: 30,
      skip: 0,
      deletedTodosBeforeNewPage: 0,
    };
    store = mockStore(state);
    const getStateMethod = () => ({
      todo: state,
    });
    store.getState = getStateMethod;
  });

  it('todo screen should show an error when needed', () => {
    // Getting
    const spyDispatch = jest.spyOn(redux, 'useDispatch');
    spyDispatch.mockReturnValue(jest.fn());
    const spySelector = jest.spyOn(redux, 'useSelector');
    spySelector.mockReturnValueOnce('error');
    // When
    const { queryByText } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <Todos />
        </Provider>
      </NativeBaseProvider>,
    );
    // Then
    expect(queryByText('Some error happened')).toBeTruthy();
  });
});
