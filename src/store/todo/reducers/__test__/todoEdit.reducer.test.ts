import { createSlice, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { TodoState } from '~store/todo';
import { SortTypes } from '~types/todo.types';
import { todoEditReducer } from '..';

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
        ...todoEditReducer,
      },
    });
  });

  it('editing on reducer should put todo to editing array', () => {
    const newState = counterSlice.reducer(
      state,
      counterSlice.actions.todoEditModeOn(state.todos[0].id),
    );
    expect(newState.editingTodos).toEqual([state.todos[0]]);
    expect(newState.editingInput).toEqual(state.todos[0].title);
    expect(newState.editingMode).toBeTruthy();
  });

  it('editing off reducer should emptify editing mode', () => {
    const newState = counterSlice.reducer(state, counterSlice.actions.todoEditModeOff(undefined));
    expect(newState.editingTodos).toEqual([]);
    expect(newState.editingInput).toBe('');
    expect(newState.editingMode).toBeFalsy();
    expect(newState.filterMode).toBe(SortTypes.DEFAULT);
  });

  it('editing off reducer should show default filter', () => {
    const newState = counterSlice.reducer(
      { ...state, filterMode: SortTypes.SELECT_DESC },
      counterSlice.actions.todoEditModeOff(undefined),
    );
    expect(newState.filterMode).toBe(SortTypes.DEFAULT);
  });

  it('editing off reducer should keep previous filter', () => {
    const newState = counterSlice.reducer(
      { ...state, filterMode: SortTypes.ID_ASC },
      counterSlice.actions.todoEditModeOff(undefined),
    );
    expect(newState.filterMode).toBe(SortTypes.ID_ASC);
  });
});
