import { SortTypes, TodosColumns } from '~types/todo.types';
import { iconPicker } from '../iconPicker';

describe('Icon picker list header util', () => {
  it('icon picker should return right icon name of id column', () => {
    expect(iconPicker(TodosColumns.ID, SortTypes.ID_ASC)).toBe('sort-asc');
    expect(iconPicker(TodosColumns.ID, SortTypes.ID_DESC)).toBe('sort-desc');
    expect(iconPicker(TodosColumns.ID, undefined as unknown as SortTypes)).toBe('sort');
  });

  it('icon picker should return right icon name of name column', () => {
    expect(iconPicker(TodosColumns.NAME, SortTypes.NAME_ASC)).toBe('sort-asc');
    expect(iconPicker(TodosColumns.NAME, SortTypes.NAME_DESC)).toBe('sort-desc');
    expect(iconPicker(TodosColumns.NAME, undefined as unknown as SortTypes)).toBe('sort');
  });

  it('icon picker should return right icon name of status column', () => {
    expect(iconPicker(TodosColumns.STATUS, SortTypes.STATUS_ASC)).toBe('sort-asc');
    expect(iconPicker(TodosColumns.STATUS, SortTypes.STATUS_DESC)).toBe('sort-desc');
    expect(iconPicker(TodosColumns.STATUS, undefined as unknown as SortTypes)).toBe('sort');
  });

  it('icon picker should return right icon name of select column', () => {
    expect(iconPicker(TodosColumns.SELECT, SortTypes.SELECT_ASC)).toBe('sort-asc');
    expect(iconPicker(TodosColumns.SELECT, SortTypes.SELECT_DESC)).toBe('sort-desc');
    expect(iconPicker(TodosColumns.SELECT, undefined as unknown as SortTypes)).toBe('sort');
  });

  it('icon picker should return sort icon name when undefined column argument', () => {
    expect(iconPicker(undefined as unknown as TodosColumns.SELECT, SortTypes.SELECT_ASC)).toBe(
      'sort',
    );
    expect(iconPicker(undefined as unknown as TodosColumns.SELECT, SortTypes.SELECT_DESC)).toBe(
      'sort',
    );
    expect(
      iconPicker(undefined as unknown as TodosColumns.SELECT, undefined as unknown as SortTypes),
    ).toBe('sort');
  });
});
