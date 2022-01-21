import { createSlice, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { TodoState } from '~store/todo';
import { SortTypes } from '~types/todo.types';
import { todoNextPageReducer } from '..';

describe('Todo next page reducer', () => {
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
        ...todoNextPageReducer,
      },
    });
  });

  it('next page reducer should change skip property', () => {
    const newState = counterSlice.reducer(
      state,
      counterSlice.actions.todoNextPageRequested(undefined),
    );
    expect(newState.skip).toBe(state.limit + state.skip);
  });
});
