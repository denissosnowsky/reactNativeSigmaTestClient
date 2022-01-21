import { SortTypes, TodoDTO } from '~types/todo.types';
import { selectSorting } from '../selectSorting';

describe('Todo list Select sorting util function', () => {
  // Given
  const editingTodoList = [{ id: 1, userId: 1, title: 'Aa', completed: true }];
  const nonEditingTodoList = [{ id: 2, userId: 2, title: 'Bb', completed: true }];
  let ascendingTodoList: Array<TodoDTO>;
  let descendingTodoList: Array<TodoDTO>;

  beforeEach(() => {
    ascendingTodoList = [...editingTodoList, ...nonEditingTodoList];
    descendingTodoList = [...nonEditingTodoList, ...editingTodoList];
  });

  it('should sort todo list in ascending order via select values', () => {
    // When
    const sortedTodoList = selectSorting(SortTypes.SELECT_ASC, editingTodoList, nonEditingTodoList);
    // Then
    expect(sortedTodoList).toEqual(ascendingTodoList);
  });

  it('should sort todo list in descending order via select values', () => {
    // When
    const sortedTodoList = selectSorting(
      SortTypes.SELECT_DESC,
      editingTodoList,
      nonEditingTodoList,
    );
    // Then
    expect(sortedTodoList).toEqual(descendingTodoList);
  });
});
