import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AnyAction, Store } from '@reduxjs/toolkit';
import * as redux from 'react-redux';

import { SortTypes } from '~types/todo.types';
import { TodoState } from '~store/todo';
import { ListHeader } from '..';

afterEach(cleanup);

let state: TodoState;
let store: Store<any, AnyAction>;
const mockStore = configureStore();

describe('List header component', () => {
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

  it('list header should show status column in not editing mode', () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValueOnce(SortTypes.DEFAULT);
    spy.mockReturnValueOnce(false);
    spy.mockReturnValueOnce([1, 2, 3]);
    // When
    const { getByText } = render(
      <Provider store={store}>
        <ListHeader />
      </Provider>,
    );
    // Then
    expect(getByText('Status')).toBeTruthy();
  });

  it('list header should show status column with not multiple editing mode', () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValueOnce(SortTypes.DEFAULT);
    spy.mockReturnValueOnce(true);
    spy.mockReturnValueOnce([]);
    // When
    const { getByText } = render(
      <Provider store={store}>
        <ListHeader />
      </Provider>,
    );
    // Then
    expect(getByText('Status')).toBeTruthy();
  });

  it('list header should show selected column editing mode and editing multiple todos', () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValueOnce(SortTypes.DEFAULT);
    spy.mockReturnValueOnce(true);
    spy.mockReturnValueOnce([1, 2, 3]);
    // When
    const { getByText } = render(
      <Provider store={store}>
        <ListHeader />
      </Provider>,
    );
    // Then
    expect(getByText('Selected')).toBeTruthy();
  });
});
