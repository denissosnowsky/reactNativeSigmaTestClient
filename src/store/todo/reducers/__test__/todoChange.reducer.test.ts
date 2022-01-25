import { createSlice, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { TodoState } from '~store/todo';
import { SortTypes, TodoDTO } from '~types/todo.types';
import { todoChangeReducer } from '..';

describe('Todo change reducer', () => {
  let state: TodoState;
  let counterSlice: Slice<TodoState, SliceCaseReducers<TodoState>, string>;

  let todo: TodoDTO;
  let editingTodo: TodoDTO;

  beforeEach(() => {
    todo = {
      id: 1,
      userId: 1,
      title: 'todo1',
      completed: false,
    };
    editingTodo = {
      id: 2,
      userId: 2,
      title: 'todo2',
      completed: false,
    };
    state = {
      loading: false,
      error: '',
      cursor: 0,
      todos: [todo],
      editingMode: true,
      editingTodos: [editingTodo],
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
        ...todoChangeReducer,
      },
    });
  });

  it('todo change reducer request should change filter to desc', () => {
    const newState = counterSlice.reducer(
      { ...state, filterMode: SortTypes.SELECT_DESC },
      counterSlice.actions.todoChangeRequested({ id: todo.id, text: 'new titile' }),
    );
    expect(newState.filterMode).toEqual(SortTypes.DEFAULT);
  });

  it('todo change reducer request should keep previous mode', () => {
    const newState = counterSlice.reducer(
      { ...state, filterMode: SortTypes.ID_ASC },
      counterSlice.actions.todoChangeRequested({ id: todo.id, text: 'new titile' }),
    );
    expect(newState.filterMode).toEqual(SortTypes.ID_ASC);
  });

  it('todo change reducer request should change todo title', () => {
    const newState = counterSlice.reducer(
      { ...state, todos: [todo, editingTodo] },
      counterSlice.actions.todoChangeRequested({ id: todo.id, text: 'new titile' }),
    );
    expect(newState.todos).toEqual([{ ...todo, title: 'new titile' }, editingTodo]);
    expect(newState.editingMode).toBeFalsy();
    expect(newState.filterMode).toEqual(SortTypes.DEFAULT);
  });

  it('todo change reducer success should empty editing mode', () => {
    const newState = counterSlice.reducer(state, counterSlice.actions.todoChangeSuccessful(1));
    expect(newState.editingTodos).toEqual([]);
    expect(newState.editingInput).toBe('');
  });

  it('todo change reducer fail should return back title', () => {
    const newState = counterSlice.reducer(
      { ...state, todos: [todo, editingTodo] },
      counterSlice.actions.todoChangeFailed({ error: 'error', id: todo.id }),
    );
    expect(newState.todos).toEqual([{ ...todo, title: editingTodo.title }, editingTodo]);
    expect(newState.editingTodos).toEqual([]);
    expect(newState.editingInput).toBe('');
    expect(newState.error).toBe('error');
  });
});
