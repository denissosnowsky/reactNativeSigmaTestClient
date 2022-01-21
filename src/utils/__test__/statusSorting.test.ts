import { SortTypes, TodoDTO } from '~types/todo.types';
import { statusSorting } from '../statusSorting';

describe('Todo list Status sorting util function', () => {
  // Given
  const firstObject = { id: 1, userId: 1, title: 'Aa', completed: true };
  const seconsObject = { id: 2, userId: 1, title: 'bB', completed: false };
  let ascendingTodoList: Array<TodoDTO>;
  let descendingTodoList: Array<TodoDTO>;

  beforeEach(() => {
    ascendingTodoList = [firstObject, seconsObject];
    descendingTodoList = [seconsObject, firstObject];
  });

  it('should sort todo list in ascending order via status values', () => {
    // When
    const sortedTodoListFromAscending = statusSorting(SortTypes.STATUS_ASC, ascendingTodoList);
    const sortedTodoListFromDescending = statusSorting(SortTypes.STATUS_ASC, descendingTodoList);
    // Then
    expect(sortedTodoListFromAscending).toEqual(ascendingTodoList);
    expect(sortedTodoListFromDescending).toEqual(ascendingTodoList);
  });

  it('should sort todo list in descending order via status values', () => {
    // When
    const sortedTodoListFromAscending = statusSorting(SortTypes.STATUS_DESC, ascendingTodoList);
    const sortedTodoListFromDescending = statusSorting(SortTypes.STATUS_DESC, descendingTodoList);
    // Then
    expect(sortedTodoListFromAscending).toEqual(descendingTodoList);
    expect(sortedTodoListFromDescending).toEqual(descendingTodoList);
  });
});
