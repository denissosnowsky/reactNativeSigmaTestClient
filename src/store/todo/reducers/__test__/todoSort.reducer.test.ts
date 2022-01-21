import { createSlice } from '@reduxjs/toolkit';
import { TodoState } from '~store/todo';
import { SortTypes, TodosColumns } from '~types/todo.types';
import { todoSortReducer } from '..';

describe('Todo sort reducer', () => {
  let state: TodoState;

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
  });

  it('sort reducer should sort properly by id ascending', () => {
    const initialState = { ...state, filterMode: SortTypes.ID_ASC };
    const counterSlice = createSlice({
      name: 'todo',
      initialState,
      reducers: {
        ...todoSortReducer,
      },
    });
    const newState = counterSlice.reducer(
      initialState,
      counterSlice.actions.todoSortRequested(TodosColumns.ID),
    );
    expect(newState.filterMode).toBe(SortTypes.ID_DESC);
  });

  it('sort reducer should sort properly by id descending', () => {
    const initialState = { ...state, filterMode: SortTypes.ID_DESC };
    const counterSlice = createSlice({
      name: 'todo',
      initialState,
      reducers: {
        ...todoSortReducer,
      },
    });
    const newState = counterSlice.reducer(
      initialState,
      counterSlice.actions.todoSortRequested(TodosColumns.ID),
    );
    expect(newState.filterMode).toBe(SortTypes.ID_ASC);
  });

  it('sort reducer should sort properly by name ascending', () => {
    const initialState = { ...state, filterMode: SortTypes.NAME_ASC };
    const counterSlice = createSlice({
      name: 'todo',
      initialState,
      reducers: {
        ...todoSortReducer,
      },
    });
    const newState = counterSlice.reducer(
      initialState,
      counterSlice.actions.todoSortRequested(TodosColumns.NAME),
    );
    expect(newState.filterMode).toBe(SortTypes.NAME_DESC);
  });

  it('sort reducer should sort properly by name descending', () => {
    const initialState = { ...state, filterMode: SortTypes.NAME_DESC };
    const counterSlice = createSlice({
      name: 'todo',
      initialState,
      reducers: {
        ...todoSortReducer,
      },
    });
    const newState = counterSlice.reducer(
      initialState,
      counterSlice.actions.todoSortRequested(TodosColumns.NAME),
    );
    expect(newState.filterMode).toBe(SortTypes.NAME_ASC);
  });

  it('sort reducer should sort properly by status ascending', () => {
    const initialState = { ...state, filterMode: SortTypes.STATUS_ASC };
    const counterSlice = createSlice({
      name: 'todo',
      initialState,
      reducers: {
        ...todoSortReducer,
      },
    });
    const newState = counterSlice.reducer(
      initialState,
      counterSlice.actions.todoSortRequested(TodosColumns.STATUS),
    );
    expect(newState.filterMode).toBe(SortTypes.STATUS_DESC);
  });

  it('sort reducer should sort properly by status descending', () => {
    const initialState = { ...state, filterMode: SortTypes.STATUS_DESC };
    const counterSlice = createSlice({
      name: 'todo',
      initialState,
      reducers: {
        ...todoSortReducer,
      },
    });
    const newState = counterSlice.reducer(
      initialState,
      counterSlice.actions.todoSortRequested(TodosColumns.STATUS),
    );
    expect(newState.filterMode).toBe(SortTypes.STATUS_ASC);
  });

  it('sort reducer should sort properly by selected ascending', () => {
    const initialState = { ...state, filterMode: SortTypes.SELECT_ASC };
    const counterSlice = createSlice({
      name: 'todo',
      initialState,
      reducers: {
        ...todoSortReducer,
      },
    });
    const newState = counterSlice.reducer(
      initialState,
      counterSlice.actions.todoSortRequested(TodosColumns.SELECT),
    );
    expect(newState.filterMode).toBe(SortTypes.SELECT_DESC);
  });

  it('sort reducer should sort properly by selected descending', () => {
    const initialState = { ...state, filterMode: SortTypes.SELECT_DESC };
    const counterSlice = createSlice({
      name: 'todo',
      initialState,
      reducers: {
        ...todoSortReducer,
      },
    });
    const newState = counterSlice.reducer(
      initialState,
      counterSlice.actions.todoSortRequested(TodosColumns.SELECT),
    );
    expect(newState.filterMode).toBe(SortTypes.SELECT_ASC);
  });

  it('sort reducer should sort in descending order when default state', () => {
    const initialState = { ...state, filterMode: SortTypes.DEFAULT };
    const counterSlice = createSlice({
      name: 'todo',
      initialState,
      reducers: {
        ...todoSortReducer,
      },
    });
    const newStateId = counterSlice.reducer(
      initialState,
      counterSlice.actions.todoSortRequested(TodosColumns.ID),
    );
    const newStateName = counterSlice.reducer(
      initialState,
      counterSlice.actions.todoSortRequested(TodosColumns.NAME),
    );
    const newStateStatus = counterSlice.reducer(
      initialState,
      counterSlice.actions.todoSortRequested(TodosColumns.STATUS),
    );
    const newStateSelect = counterSlice.reducer(
      initialState,
      counterSlice.actions.todoSortRequested(TodosColumns.SELECT),
    );
    expect(newStateId.filterMode).toBe(SortTypes.ID_DESC);
    expect(newStateName.filterMode).toBe(SortTypes.NAME_DESC);
    expect(newStateStatus.filterMode).toBe(SortTypes.STATUS_DESC);
    expect(newStateSelect.filterMode).toBe(SortTypes.SELECT_DESC);
  });

  it('sort reducer should sort by default when wrong action payload is thrown', () => {
    const counterSlice = createSlice({
      name: 'todo',
      initialState: state,
      reducers: {
        ...todoSortReducer,
      },
    });
    const newState = counterSlice.reducer(
      state,
      counterSlice.actions.todoSortRequested(undefined as unknown as TodosColumns),
    );
    expect(newState.filterMode).toBe(SortTypes.DEFAULT);
  });
});
