import { createSlice, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { TodoState } from '~store/todo';
import { SortTypes } from '~types/todo.types';
import { todoDeleteReducer } from '..';

describe('Todo delete reducer', () => {
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
      editingMode: true,
      editingTodos: [
        {
          id: 3,
          userId: 3,
          title: 'todo3',
          completed: false,
        },
      ],
      editingInput: 'Read',
      filterMode: SortTypes.SELECT_DESC,
      allTodosCount: 10,
      limit: 30,
      skip: 0,
      deletedTodosBeforeNewPage: 0,
    };
    counterSlice = createSlice({
      name: 'todo',
      initialState: state,
      reducers: {
        ...todoDeleteReducer,
      },
    });
  });

  it('delete reducer request should delete multiple todos from store', () => {
    const deletedTodosIds = [state.todos[0].id, state.todos[1].id];
    const newState = counterSlice.reducer(
      state,
      counterSlice.actions.todoDeleteRequested(deletedTodosIds),
    );
    expect(newState.todos).toEqual([]);
    expect(newState.allTodosCount).toEqual(state.allTodosCount - deletedTodosIds.length);
    expect(newState.deletedTodosBeforeNewPage).toEqual(
      state.deletedTodosBeforeNewPage + deletedTodosIds.length,
    );
    expect(newState.editingMode).toBeFalsy();
    expect(newState.filterMode).toEqual(SortTypes.DEFAULT);
  });

  it('delete reducer request should keep previous filter', () => {
    const deletedTodosIds = [state.todos[0].id, state.todos[1].id];
    const newState = counterSlice.reducer(
      { ...state, filterMode: SortTypes.ID_ASC },
      counterSlice.actions.todoDeleteRequested(deletedTodosIds),
    );
    expect(newState.filterMode).toEqual(SortTypes.ID_ASC);
  });

  it('delete reducer success should emptify edit mode', () => {
    const deletedTodosIds = [state.todos[0].id, state.todos[1].id];
    const newState = counterSlice.reducer(
      state,
      counterSlice.actions.todoDeleteSuccessful(deletedTodosIds),
    );
    expect(newState.editingTodos).toEqual([]);
    expect(newState.editingInput).toBe('');
  });

  it('delete reducer fail sholud return back todos', () => {
    const deletedTodosIds = [state.todos[0].id, state.todos[1].id];
    const newState = counterSlice.reducer(
      state,
      counterSlice.actions.todoDeleteFailed({ error: 'error', ids: deletedTodosIds }),
    );
    expect(newState.editingTodos).toEqual([]);
    expect(newState.editingInput).toBe('');
    expect(newState.error).toBe('error');
    expect(newState.todos).toEqual([...state.todos, ...state.editingTodos]);
    expect(newState.deletedTodosBeforeNewPage).toEqual(
      state.deletedTodosBeforeNewPage - deletedTodosIds.length,
    );
    expect(newState.allTodosCount).toBe(state.allTodosCount + state.editingTodos.length);
  });

  it('delete reducer request should change cursor if last todo was deleted', () => {
    const prevTodos = [
      { id: 1, userId: 1, title: 'todo1', completed: false },
      { id: 2, userId: 2, title: 'todo2', completed: false },
    ];
    const deletedTodosIds = [2];
    const newState = counterSlice.reducer(
      {
        ...state,
        todos: prevTodos,
        cursor: 2,
      },
      counterSlice.actions.todoDeleteRequested(deletedTodosIds),
    );
    expect(newState.cursor).toEqual(1);
  });

  it('delete reducer request shouldn"t change cursor if last todo wasn"t deleted', () => {
    const prevTodos = [
      { id: 1, userId: 1, title: 'todo1', completed: false },
      { id: 2, userId: 2, title: 'todo2', completed: false },
    ];
    const deletedTodosIds = [1];
    const newState = counterSlice.reducer(
      {
        ...state,
        todos: prevTodos,
        cursor: 2,
      },
      counterSlice.actions.todoDeleteRequested(deletedTodosIds),
    );
    expect(newState.cursor).toEqual(2);
  });

  it('delete reducer fail shouldn"t change cursor if last todo was deleted', () => {
    const prevTodos = [
      { id: 1, userId: 1, title: 'todo1', completed: false },
      { id: 2, userId: 2, title: 'todo2', completed: false },
    ];
    const deletedTodosIds = [2];
    const newState = counterSlice.reducer(
      {
        ...state,
        todos: prevTodos,
        cursor: 2,
      },
      counterSlice.actions.todoDeleteFailed({ error: 'error', ids: deletedTodosIds }),
    );
    expect(newState.cursor).toEqual(2);
  });

  it('delete reducer fail shouldn"t change cursor if last todo wasn"t deleted', () => {
    const prevTodos = [
      { id: 1, userId: 1, title: 'todo1', completed: false },
      { id: 2, userId: 2, title: 'todo2', completed: false },
    ];
    const deletedTodosIds = [1];
    const newState = counterSlice.reducer(
      {
        ...state,
        todos: prevTodos,
        cursor: 2,
      },
      counterSlice.actions.todoDeleteFailed({ error: 'error', ids: deletedTodosIds }),
    );
    expect(newState.cursor).toEqual(2);
  });
});
