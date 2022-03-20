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
import { TodoList } from '..';

afterEach(cleanup);

jest.mock('../utils/fetchNextPage');

let state: TodoState;
let store: Store<any, AnyAction>;
const mockStore = configureStore();

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe('TodoForm component', () => {
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

  it('todo list should show loading when first initialization', () => {
    // Getting
    const spyDispatch = jest.spyOn(redux, 'useDispatch');
    spyDispatch.mockReturnValue(jest.fn());
    const spySelector = jest.spyOn(redux, 'useSelector');
    spySelector
      .mockReturnValueOnce('todoObject')
      .mockReturnValueOnce('')
      .mockReturnValueOnce('')
      .mockReturnValueOnce('')
      .mockReturnValueOnce('')
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true);
    // When
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <TodoList />
        </Provider>
      </NativeBaseProvider>,
    );
    // Then
    expect(queryByTestId('init')).toBeTruthy();
    expect(queryByTestId('list')).toBeFalsy();
  });

  it('todo list should show loading when store loading', () => {
    // Getting
    const spyDispatch = jest.spyOn(redux, 'useDispatch');
    spyDispatch.mockReturnValue(jest.fn());
    const spySelector = jest.spyOn(redux, 'useSelector');
    spySelector
      .mockReturnValueOnce([{ id: 1, userId: 1, title: 'todo', completed: false }])
      .mockReturnValueOnce([])
      .mockReturnValueOnce('')
      .mockReturnValueOnce('')
      .mockReturnValueOnce('')
      .mockReturnValueOnce(true);
    // When
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <TodoList />
        </Provider>
      </NativeBaseProvider>,
    );
    // Then
    expect(queryByTestId('loading')).toBeTruthy();
  });

  it('todo list should be replaced by text when empty', () => {
    // Getting
    const spyDispatch = jest.spyOn(redux, 'useDispatch');
    spyDispatch.mockReturnValue(jest.fn());
    const spySelector = jest.spyOn(redux, 'useSelector');
    spySelector.mockReturnValueOnce([]);
    // When
    const { queryByText } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <TodoList />
        </Provider>
      </NativeBaseProvider>,
    );
    // Then
    expect(queryByText('No todos found')).toBeTruthy();
  });
});
