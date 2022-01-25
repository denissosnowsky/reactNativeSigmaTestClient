import { createSlice, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { TodoState } from '~store/todo';
import { SortTypes } from '~types/todo.types';
import { todoSelectReducer } from '..';

describe('Todo select reducer', () => {
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
      ],
      editingMode: false,
      editingTodos: [
        {
          id: 2,
          userId: 2,
          title: 'todo2',
          completed: false,
        },
      ],
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
        ...todoSelectReducer,
      },
    });
  });

  it('select on should add todo to editing array', () => {
    const newState = counterSlice.reducer(
      state,
      counterSlice.actions.todoSelectOn(state.todos[0].id),
    );
    expect(newState.editingTodos).toEqual([...state.editingTodos, state.todos[0]]);
  });

  it('deselect should remove todo from editing array', () => {
    const newState = counterSlice.reducer(
      state,
      counterSlice.actions.todoDeselectOn(state.editingTodos[0].id),
    );
    expect(newState.editingTodos).toEqual([]);
  });
});
