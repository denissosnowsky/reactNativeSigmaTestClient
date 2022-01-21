import { compareIds } from '../compareIds';

describe('CompareIds util', () => {
  it('compareIds should compare ids', () => {
    // Given
    const object1 = { id: 1 };
    const object2 = { id: 2 };
    // When
    const isEqual1 = compareIds(1)(object1);
    const isEqual2 = compareIds(1)(object2);
    // Then
    expect(isEqual1).toBeTruthy();
    expect(isEqual2).toBeFalsy();
  });
});
