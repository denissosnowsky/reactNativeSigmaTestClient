import { todoAddThunk } from './todoAdd.thunk';
import { todoChangeThunk } from './todoChange.thunk';
import { todoCompleteThunk } from './todoComplete.thunk';
import { todoDeleteThunk } from './todoDelete.thunk';
import { todoGetCursorThunk } from './todoGetCursor.thunk';
import { todosFetchThunk } from './todosFetch.thunk';

export const todoThunks = {
  todoAddThunk,
  todoChangeThunk,
  todoCompleteThunk,
  todoDeleteThunk,
  todoGetCursorThunk,
  todosFetchThunk,
};
