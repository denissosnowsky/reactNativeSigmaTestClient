import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AnyAction, Store } from '@reduxjs/toolkit';
import { NativeBaseProvider } from 'native-base';
import * as redux from 'react-redux';
import renderer from 'react-test-renderer';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import { TodoState } from '~store/todo';
import { SortTypes } from '~types/todo.types';
import { ListItem } from '..';
import { onSelectHandler } from '../utils/onSelectHandler';
import { onCheckPressHandle } from '../utils/onCheckPressHandle';

jest.mock('../utils/onSelectHandler');
jest.mock('../utils/onCheckPressHandle');

afterEach(cleanup);

let state: TodoState;
let store: Store<any, AnyAction>;
const mockStore = configureStore();
const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe('List item component', () => {
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

  it('list item should render proper id and text from props', () => {
    // Given
    const id = 1;
    const text = 'todo';
    // When
    const { getByText } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <ListItem id={id} text={text} complete onLongPress={jest.fn()} onPressCheck={jest.fn()} />
        </Provider>
      </NativeBaseProvider>,
    );
    // Then
    expect(getByText(`${id}.`)).toBeTruthy();
    expect(getByText(text)).toBeTruthy();
  });

  it('list item should fire onLongPress callbacks', () => {
    // Given
    const onPressCheckMock = jest.fn();
    const onLongPressMock = jest.fn();
    const id = 1;
    const text = 'todo';
    // When
    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <ListItem
            id={id}
            text={text}
            complete
            onPressCheck={onPressCheckMock}
            onLongPress={onLongPressMock}
          />
        </Provider>
      </NativeBaseProvider>,
    );
    // When
    fireEvent(getByTestId('list-item-wrapper'), 'onLongPress');
    // Then
    expect(onLongPressMock).toHaveBeenCalled();
  });

  it('list item shouldn"t render id column and render input with value from state when non-completed todo is editing, and fire dispatch', () => {
    // Given
    const id = 1;
    const text = 'todo';
    const spySelector = jest.spyOn(redux, 'useSelector');
    const spyDispatch = jest.spyOn(redux, 'useDispatch');
    const mockDispatch = jest.fn();
    spyDispatch.mockReturnValue(mockDispatch);
    spySelector.mockReturnValueOnce('value').mockReturnValueOnce(true).mockReturnValueOnce([]);
    // When
    const { queryByText, getByPlaceholderText } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <ListItem
            id={id}
            text={text}
            complete={false}
            editingMode
            onLongPress={jest.fn()}
            onPressCheck={jest.fn()}
          />
        </Provider>
      </NativeBaseProvider>,
    );
    const input = getByPlaceholderText('Enter todo');
    fireEvent.changeText(input, 'todo');
    // Then
    expect(queryByText(`${id}.`)).toBeFalsy();
    expect(input).toBeTruthy();
    expect(input).toHaveProp('value', 'value');
    expect(queryByText(text)).toBeFalsy();
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: 'todo',
      type: 'todo/todoEditingInputChange',
    });
  });

  it('list item should render check icon when completed and check callback should be fired', () => {
    // Given
    const id = 1;
    const text = 'todo';
    const spySelector = jest.spyOn(redux, 'useSelector');
    spySelector.mockReturnValueOnce('').mockReturnValueOnce(false);
    // When
    const tree = renderer.create(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <ListItem id={id} text={text} complete onLongPress={jest.fn()} onPressCheck={jest.fn()} />
        </Provider>
      </NativeBaseProvider>,
    );
    const icon = tree.root.findByType(AntDesign);
    // Then
    expect(icon.props.name).toBe('checkcircle');
    // When
    fireEvent(icon, 'onPress');
    // Then
    expect(onCheckPressHandle).toHaveBeenCalled();
    tree.unmount();
  });

  it('list item should render check icon when multiple selected and fire select callback', () => {
    // Given
    const id = 1;
    const text = 'todo';
    const spySelector = jest.spyOn(redux, 'useSelector');
    spySelector
      .mockReturnValueOnce('')
      .mockReturnValueOnce(true)
      .mockReturnValueOnce([{ id: 1 }, { id: 2 }, { id: 3 }]);
    // When
    const tree = renderer.create(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <ListItem
            id={id}
            text={text}
            complete={false}
            onLongPress={jest.fn()}
            onPressCheck={jest.fn()}
          />
        </Provider>
      </NativeBaseProvider>,
    );
    const icon = tree.root.findByType(AntDesign);
    // Then
    expect(icon.props.name).toBe('checkcircle');
    // When
    fireEvent(icon, 'onPress');
    // Then
    expect(onSelectHandler).toHaveBeenCalled();
    tree.unmount();
  });

  it('list item should render pencil icon when changing title', () => {
    // Given
    const id = 1;
    const text = 'todo';
    const spySelector = jest.spyOn(redux, 'useSelector');
    spySelector
      .mockReturnValueOnce('')
      .mockReturnValueOnce(true)
      .mockReturnValueOnce([{ id: 1 }]);
    // When
    const tree = renderer.create(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <ListItem
            id={id}
            text={text}
            complete={false}
            editingMode
            onLongPress={jest.fn()}
            onPressCheck={jest.fn()}
          />
        </Provider>
      </NativeBaseProvider>,
    );
    // Then
    expect(tree.root.findByType(MaterialCommunityIcons).props.name).toBe('pencil');
    tree.unmount();
  });

  it('list item should render empty circle icon when non compelted and check callback should be fired', () => {
    // Given
    const id = 1;
    const text = 'todo';
    const spySelector = jest.spyOn(redux, 'useSelector');
    spySelector.mockReturnValueOnce('').mockReturnValueOnce(false);
    // When
    const tree = renderer.create(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <ListItem
            id={id}
            text={text}
            complete={false}
            onLongPress={jest.fn()}
            onPressCheck={jest.fn()}
          />
        </Provider>
      </NativeBaseProvider>,
    );
    const icon = tree.root.findByType(MaterialCommunityIcons);
    // Then
    expect(icon.props.name).toBe('checkbox-blank-circle-outline');
    // When
    fireEvent(icon, 'onPress');
    // Then
    expect(onCheckPressHandle).toHaveBeenCalled();
    tree.unmount();
  });

  it('non-selected list item should render empty circle icon when multiple selection', () => {
    // Given
    const id = 1;
    const text = 'todo';
    const spySelector = jest.spyOn(redux, 'useSelector');
    spySelector
      .mockReturnValueOnce('')
      .mockReturnValueOnce(true)
      .mockReturnValueOnce([{ id: 2 }, { id: 3 }]);
    // When
    const tree = renderer.create(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <ListItem
            id={id}
            text={text}
            complete={false}
            onLongPress={jest.fn()}
            onPressCheck={jest.fn()}
          />
        </Provider>
      </NativeBaseProvider>,
    );
    const icon = tree.root.findByType(MaterialCommunityIcons);
    // Then
    expect(icon.props.name).toBe('checkbox-blank-circle-outline');
    // When
    fireEvent(icon, 'onPress');
    // Then
    expect(onSelectHandler).toHaveBeenCalled();
    tree.unmount();
  });

  it('list item should fire onSelect callbacks', () => {
    // Given
    const id = 1;
    const text = 'todo';
    // When
    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <ListItem
            id={id}
            text={text}
            complete={false}
            onLongPress={jest.fn()}
            onPressCheck={jest.fn()}
          />
        </Provider>
      </NativeBaseProvider>,
    );
    fireEvent(getByTestId('list-item-wrapper'), 'onPress');
    // Then
    expect(onSelectHandler).toHaveBeenCalled();
  });
});
