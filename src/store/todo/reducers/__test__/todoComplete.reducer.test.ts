import { createSlice, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { TodoState } from '~store/todo';
import { SortTypes, TodoDTO } from '~types/todo.types';
import { todoCompleteReducer } from '..';

describe('Todo complete reducer', () => {
  let state: TodoState;
  let counterSlice: Slice<TodoState, SliceCaseReducers<TodoState>, string>;

  let todo: TodoDTO;

  const todo2 = {
    id: 2,
    userId: 2,
    title: 'todo2',
    completed: false,
  };

  beforeEach(() => {
    todo = {
      id: 1,
      userId: 1,
      title: 'todo1',
      completed: false,
    };
    state = {
      loading: false,
      error: '',
      cursor: 0,
      todos: [todo],
      editingMode: false,
      editingTodos: [todo],
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
        ...todoCompleteReducer,
      },
    });
  });

  it('todo complete reducer request should change complete to true', () => {
    const newState = counterSlice.reducer(
      { ...state, todos: [todo, todo2], editingTodos: [todo, todo2] },
      counterSlice.actions.todoCompleteRequested(todo.id),
    );
    expect(newState.todos).toEqual([{ ...todo, completed: !todo.completed }, todo2]);
    expect(newState.editingTodos).toEqual([{ ...todo, completed: !todo.completed }, todo2]);
  });

  it('todo complete reducer success shouldn"t change state', () => {
    const newState = counterSlice.reducer(
      state,
      counterSlice.actions.todoCompleteSuccessful(todo.id),
    );
    expect(newState).toEqual(state);
  });

  it('todo complete reducer fail should change compelte back', () => {
    const initialState = {
      ...state,
      todos: [{ ...todo, completed: !todo.completed }, todo2],
      editingTodos: [{ ...todo, completed: !todo.completed }, todo2],
    };
    const counterSlice = createSlice({
      name: 'todo',
      initialState,
      reducers: {
        ...todoCompleteReducer,
      },
    });
    const newState = counterSlice.reducer(
      initialState,
      counterSlice.actions.todoCompleteFailed({ error: 'error', id: todo.id }),
    );
    expect(newState.todos).toEqual([todo, todo2]);
    expect(newState.editingTodos).toEqual([todo, todo2]);
    expect(newState.error).toBe('error');
  });
});
