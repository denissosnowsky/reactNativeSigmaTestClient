import { createSlice, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { TodoState } from '~store/todo';
import { SortTypes } from '~types/todo.types';
import { todoFetchReducer } from '..';

describe('Todo fetch reducer', () => {
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
        ...todoFetchReducer,
      },
    });
  });

  it('fetch reducer request should change loading to true', () => {
    const newState = counterSlice.reducer(
      state,
      counterSlice.actions.todosFetchRequested(undefined),
    );

    expect(newState.loading).toBeTruthy();
  });

  it('fetch reducer success add new todos to store', () => {
    const newTodos = [
      {
        id: 1,
        userId: 1,
        title: 'todo1',
        completed: false,
      },
    ];
    const count = 100;

    const newState = counterSlice.reducer(
      state,
      counterSlice.actions.todosFetchSuccessful({ todos: newTodos, count }),
    );

    expect(newState.todos).toEqual(newTodos);
    expect(newState.deletedTodosBeforeNewPage).toBe(0);
    expect(newState.loading).toBeFalsy();
    expect(newState.allTodosCount).toBe(count);
  });

  it('fetch reducer fail should return error and falsy loading', () => {
    const newState = counterSlice.reducer(state, counterSlice.actions.todosFetchFailed('error'));

    expect(newState.loading).toBeFalsy();
    expect(newState.error).toBe('error');
  });
});
