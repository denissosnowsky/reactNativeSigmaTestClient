import { SortTypes, TodoDTO } from '~types/todo.types';
import { nameSorting } from '../nameSorting';

describe('Todo list Name sorting util function', () => {
  // Given
  const firstObject = { id: 1, userId: 1, title: 'Aa', completed: true };
  const seconsObject = { id: 2, userId: 1, title: 'bB', completed: true };
  let ascendingTodoList: Array<TodoDTO>;
  let descendingTodoList: Array<TodoDTO>;

  beforeEach(() => {
    ascendingTodoList = [firstObject, seconsObject];
    descendingTodoList = [seconsObject, firstObject];
  });

  it('should sort todo list in ascending order via name values', () => {
    // When
    const sortedTodoListFromAscending = nameSorting(SortTypes.NAME_ASC, ascendingTodoList);
    const sortedTodoListFromDescending = nameSorting(SortTypes.NAME_ASC, descendingTodoList);
    // Then
    expect(sortedTodoListFromAscending).toEqual(ascendingTodoList);
    expect(sortedTodoListFromDescending).toEqual(ascendingTodoList);
  });

  it('should sort todo list in descending order via name values', () => {
    // When
    const sortedTodoListFromAscending = nameSorting(SortTypes.NAME_DESC, ascendingTodoList);
    const sortedTodoListFromDescending = nameSorting(SortTypes.NAME_DESC, descendingTodoList);
    // Then
    expect(sortedTodoListFromAscending).toEqual(descendingTodoList);
    expect(sortedTodoListFromDescending).toEqual(descendingTodoList);
  });
});
