import { SortTypes, TodoDTO } from '~types/todo.types';
import { idSorting } from '../idSorting';

describe('Todo list Id sorting util function', () => {
  // Given
  const firstObject = { id: 1, userId: 1, title: 'title', completed: true };
  const seconsObject = { id: 2, userId: 1, title: 'title', completed: true };
  let ascendingTodoList: Array<TodoDTO>;
  let descendingTodoList: Array<TodoDTO>;

  beforeEach(() => {
    ascendingTodoList = [firstObject, seconsObject];
    descendingTodoList = [seconsObject, firstObject];
  });

  it('should sort todo list in ascending order via id values', () => {
    // When
    const sortedTodoListFromAscending = idSorting(SortTypes.ID_ASC, ascendingTodoList);
    const sortedTodoListFromDescending = idSorting(SortTypes.ID_ASC, descendingTodoList);
    // Then
    expect(sortedTodoListFromAscending).toEqual(ascendingTodoList);
    expect(sortedTodoListFromDescending).toEqual(descendingTodoList);
  });

  it('should sort todo list in descending order via id values', () => {
    // When
    const sortedTodoListFromAscending = idSorting(SortTypes.ID_DESC, ascendingTodoList);
    const sortedTodoListFromDescending = idSorting(SortTypes.ID_DESC, descendingTodoList);
    // Then
    expect(sortedTodoListFromAscending).toEqual(descendingTodoList);
    expect(sortedTodoListFromDescending).toEqual(descendingTodoList);
  });
});
