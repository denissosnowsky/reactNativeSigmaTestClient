import { createAction } from '@reduxjs/toolkit';
import { TodoDTO, TodosColumns } from '~types/todo.types';

const todoAddRequested = createAction<TodoDTO>('todoAdd/requested');
const todoAddSuccessful = createAction<TodoDTO>('todoAdd/successful');
const todoAddFailed = createAction<{ error: string; id: number }>('todoAdd/failed');

const todoGetCoursorRequested = createAction('todoGetCursor/requested');
const todoGetCoursorSuccessful = createAction<number>('todoGetCursor/successful');
const todoGetCoursorFailed = createAction<string>('todoGetCursor/failed');

const todosFetchRequested = createAction('todosFetch/requested');
const todosFetchSuccessful = createAction<{
  todos: Array<TodoDTO>;
  count: number;
}>('todosFetch/successful');
const todosFetchFailed = createAction<string>('todosFetch/failed');

const todoCompleteRequested = createAction<number>('todoComplete/requested');
const todoCompleteSuccessful = createAction<number>('todoComplete/successful');
const todoCompleteFailed = createAction<{ error: string; id: number }>('todoComplete/failed');

const todoDeleteRequested = createAction<Array<number>>('todoDelete/requested');
const todoDeleteSuccessful = createAction<Array<number>>('todoDelete/successful');
const todoDeleteFailed = createAction<string>('todoDelete/failed');

const todoChangeRequested = createAction<{ id: number; text: string }>('todoChange/requested');
const todoChangeSuccessful = createAction<number>('todoChange/successful');
const todoChangeFailed = createAction<{ error: string; id: number }>('todoChange/failed');

const todoEditModeOn = createAction<number>('todoEditMode/on');
const todoEditModeOff = createAction('todoEditMode/off');

const todoSelect = createAction<number>('todoSelect/on');
const todoDeselect = createAction<number>('todoDeselect/on');

const todoEditingInputChange = createAction<string>('todoEditInput/on');

const todoSort = createAction<TodosColumns>('todoSort/on');

const todoEmptifyError = createAction('todoEmptyError/on');

const todoNextPage = createAction('todoNextPage/on');

export const actions = {
  todoAddRequested,
  todoAddSuccessful,
  todoAddFailed,
  todoGetCoursorRequested,
  todoGetCoursorSuccessful,
  todoGetCoursorFailed,
  todosFetchRequested,
  todosFetchSuccessful,
  todosFetchFailed,
  todoCompleteRequested,
  todoCompleteSuccessful,
  todoCompleteFailed,
  todoEditModeOn,
  todoEditModeOff,
  todoDeleteRequested,
  todoDeleteSuccessful,
  todoDeleteFailed,
  todoChangeRequested,
  todoChangeSuccessful,
  todoChangeFailed,
  todoEditingInputChange,
  todoSort,
  todoSelect,
  todoDeselect,
  todoEmptifyError,
  todoNextPage,
};
