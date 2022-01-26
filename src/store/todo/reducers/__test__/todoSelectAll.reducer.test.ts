import { createSlice, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { TodoState } from '~store/todo';
import { SortTypes } from '~types/todo.types';
import { todoSelectAllReducer } from '..';

describe('Todo editing reducer', () => {
  let state: TodoState;
  let counterSlice: Slice<TodoState, SliceCaseReducers<TodoState>, string>;

  beforeEach(() => {
    state = {
      loading: false,
      error: '',
      cursor: 0,
      todos: [
        {
          id: 1,
          userId: 1,
          title: 'todo1',
          completed: false,
        },
        {
          id: 2,
          userId: 2,
          title: 'todo2',
          completed: false,
        },
      ],
      editingMode: false,
      editingTodos: [],
      editingInput: '',
      filterMode: SortTypes.SELECT_ASC,
      allTodosCount: 0,
      limit: 30,
      skip: 0,
      deletedTodosBeforeNewPage: 0,
    };
    counterSlice = createSlice({
      name: 'todo',
      initialState: state,
      reducers: {
        ...todoSelectAllReducer,
      },
    });
  });

  it('select all reducer should put all todos to editing array', () => {
    const newState = counterSlice.reducer(state, counterSlice.actions.todoSelectAll(undefined));
    expect(newState.editingTodos).toEqual(state.todos);
  });
});
