import { createSlice, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { TodoState } from '~store/todo';
import { SortTypes } from '~types/todo.types';
import { todoAddReducer } from '..';

describe('Todo add reducer', () => {
  let state: TodoState;
  let counterSlice: Slice<TodoState, SliceCaseReducers<TodoState>, string>;

  const todoToAdd = {
    userId: 1,
    id: 1,
    title: 'todoToAdd',
    completed: false,
  };

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
    counterSlice = createSlice({
      name: 'todo',
      initialState: state,
      reducers: {
        ...todoAddReducer,
      },
    });
  });

  it('todo add reducer request should add todo to store', () => {
    const newState = counterSlice.reducer(state, counterSlice.actions.todoAddRequested(todoToAdd));
    expect(newState.todos).toEqual([todoToAdd]);
    expect(newState.allTodosCount).toEqual(state.allTodosCount + 1);
    expect(newState.cursor).toEqual(state.cursor + 1);
    expect(newState.deletedTodosBeforeNewPage).toBe(state.deletedTodosBeforeNewPage - 1);
  });

  it('todo add reducer succecc shouldn"t change state', () => {
    const newState = counterSlice.reducer(state, counterSlice.actions.todoAddSuccessful(todoToAdd));
    expect(newState).toEqual(state);
  });

  it('todo add reducer fail should delete todos back', () => {
    const initialState = { ...state, todos: [todoToAdd], allTodosCount: 1, cursor: 1 };
    const counterSlice = createSlice({
      name: 'todo',
      initialState,
      reducers: {
        ...todoAddReducer,
      },
    });
    const newState = counterSlice.reducer(
      initialState,
      counterSlice.actions.todoAddFailed({ error: 'error', id: todoToAdd.id }),
    );
    expect(newState.todos).toEqual([]);
    expect(newState.cursor).toEqual(initialState.cursor - 1);
    expect(newState.allTodosCount).toBe(initialState.allTodosCount - 1);
    expect(newState.error).toBe('error');
    expect(newState.deletedTodosBeforeNewPage).toBe(initialState.deletedTodosBeforeNewPage + 1);
  });
});
