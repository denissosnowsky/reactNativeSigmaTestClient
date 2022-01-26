import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AnyAction, Store } from '@reduxjs/toolkit';
import * as redux from 'react-redux';
import renderer from 'react-test-renderer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeBaseProvider } from 'native-base';

import { TodoState } from '~store/todo';
import { SortTypes } from '~types/todo.types';
import { addTodoHandler } from '../utils/addTodoHandler';
import { cancelHandler } from '../utils/cancelHandler';
import { changeTodoHandler } from '../utils/changeTodoHandler';
import { selectAllTodosHandler } from '../utils/selectAllTodosHandler';
import { TodoForm } from '..';

afterEach(cleanup);

jest.mock('../utils/addTodoHandler');
jest.mock('../utils/clearFormHandler');
jest.mock('../utils/cancelHandler');
jest.mock('../utils/changeTodoHandler');
jest.mock('../utils/selectAllTodosHandler');

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
  it('form should show input in not editing mode', () => {
    // When
    const { getByPlaceholderText, queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <TodoForm />
        </Provider>
      </NativeBaseProvider>,
    );
    // Then
    expect(getByPlaceholderText('Add new todo')).toBeTruthy();
    expect(queryByTestId('btnWrapper')).toBeFalsy();
  });

  it('form should hide input in not editing mode', () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValueOnce(true);
    // When
    const { queryByPlaceholderText, getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <TodoForm />
        </Provider>
      </NativeBaseProvider>,
    );
    // Then
    expect(queryByPlaceholderText('Add new todo')).toBeFalsy();
    expect(getByTestId('btnWrapper')).toBeTruthy();
  });

  it('form should show save button', () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValueOnce(true);
    spy.mockReturnValueOnce([{ completed: false }]);
    // When
    const { getByTestId, getAllByA11yRole } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <TodoForm />
        </Provider>
      </NativeBaseProvider>,
    );
    // Then
    expect(getByTestId('btnWrapper')).toHaveStyle({ width: '60%' });
    expect(getAllByA11yRole('button').length).toBe(3);
  });

  it('form should hide save button when one completed element is editing', () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValueOnce(true);
    spy.mockReturnValueOnce([{ completed: true }]);
    // When
    const { getByTestId, getAllByA11yRole } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <TodoForm />
        </Provider>
      </NativeBaseProvider>,
    );
    // Then
    expect(getByTestId('btnWrapper')).toHaveStyle({ width: '40%' });
    expect(getAllByA11yRole('button').length).toBe(2);
  });
  it('form should show add button and fire add callback', () => {
    // When
    const tree = renderer.create(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <TodoForm />
        </Provider>
      </NativeBaseProvider>,
    );
    // Then
    const addButton = tree.root.findByType(MaterialCommunityIcons);
    expect(addButton.props.name).toBe('plus-circle');
    // When
    fireEvent.press(addButton);
    // Then
    expect(addTodoHandler).toHaveBeenCalled();
  });

  it('form should show save, delete and cancel buttons and fire its callbacks', () => {
    // Getting
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValueOnce(true);
    spy.mockReturnValueOnce([{ completed: false }]);
    // When
    const tree = renderer.create(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <TodoForm />
        </Provider>
      </NativeBaseProvider>,
    );
    // Then
    const buttons = tree.root.findAllByType(MaterialCommunityIcons);
    expect(buttons[0].props.name).toBe('content-save');
    expect(buttons[1].props.name).toBe('delete-circle');
    expect(buttons[2].props.name).toBe('cancel');
    // When
    fireEvent.press(buttons[0]);
    fireEvent.press(buttons[2]);
    // Then
    expect(changeTodoHandler).toHaveBeenCalled();
    expect(cancelHandler).toHaveBeenCalled();
  });

  it('form should hide save button, show select-all button and fire its callback when multiple elements are editing', () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValueOnce(true);
    spy.mockReturnValueOnce([{ completed: false }, { completed: false }]);
    // When
    const tree = renderer.create(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <TodoForm />
        </Provider>
      </NativeBaseProvider>,
    );
    // Then
    const buttons = tree.root.findAllByType(MaterialCommunityIcons);
    expect(buttons[0].props.name).toBe('checkbox-multiple-marked-circle');
    expect(buttons[1].props.name).toBe('delete-circle');
    expect(buttons[2].props.name).toBe('cancel');
    // When
    fireEvent.press(buttons[0]);
    // Then
    expect(selectAllTodosHandler).toHaveBeenCalled();
  });
});
