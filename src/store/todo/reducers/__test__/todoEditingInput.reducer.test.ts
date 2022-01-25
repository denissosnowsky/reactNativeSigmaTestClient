import { createSlice, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { TodoState } from '~store/todo';
import { SortTypes } from '~types/todo.types';
import { todoEditingInputReducer } from '..';

describe('Todo editing input reducer', () => {
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
        ...todoEditingInputReducer,
      },
    });
  });

  it('editing input reducer should write proper input value', () => {
    const inputValue = 'new todo';
    const newState = counterSlice.reducer(
      state,
      counterSlice.actions.todoEditingInputChange(inputValue),
    );
    expect(newState.editingInput).toBe(inputValue);
  });
});
