import { createSlice, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { TodoState } from '~store/todo';
import { SortTypes } from '~types/todo.types';
import { todoGetCoursorReducer } from '..';

describe('Todo get cursor reducer', () => {
  let state: TodoState;
  let counterSlice: Slice<TodoState, SliceCaseReducers<TodoState>, string>;

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
        ...todoGetCoursorReducer,
      },
    });
  });

  it('get cursor request reducer shouldn"t change state', () => {
    const newState = counterSlice.reducer(
      state,
      counterSlice.actions.todoGetCoursorRequested(undefined),
    );
    expect(newState).toEqual(state);
  });

  it('get cursor success reducer should"t change cursor', () => {
    const cursor = 15;
    const newState = counterSlice.reducer(
      state,
      counterSlice.actions.todoGetCoursorSuccessful(cursor),
    );
    expect(newState.cursor).toEqual(cursor);
  });

  it('get cursor fail reducer should return error', () => {
    const newState = counterSlice.reducer(
      state,
      counterSlice.actions.todoGetCoursorFailed('error'),
    );
    expect(newState.error).toEqual('error');
  });
});
