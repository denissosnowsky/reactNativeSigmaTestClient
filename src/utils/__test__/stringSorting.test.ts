import { stringSorting } from '../stringSorting';

describe('String sorting util function', () => {
  it('should sort string values in ascending order', () => {
    // Given
    const firstOrderWord = 'a';
    const secondOrderWord = 'b';
    // When
    const orderNumberWithRightInitialOrder = stringSorting(firstOrderWord, secondOrderWord, 'asc');
    const orderNumberWithWrongInitialOrder = stringSorting(secondOrderWord, firstOrderWord, 'asc');
    const orderNumberWithEqualInitialOrder = stringSorting(firstOrderWord, firstOrderWord, 'asc');
    // Then
    expect(orderNumberWithRightInitialOrder).toBe(-1);
    expect(orderNumberWithWrongInitialOrder).toBe(1);
    expect(orderNumberWithEqualInitialOrder).toBe(0);
  });

  it('should sort string values in descending order', () => {
    // Given
    const firstOrderWord = 'b';
    const secondOrderWord = 'a';
    // When
    const orderNumberWithRightInitialOrder = stringSorting(firstOrderWord, secondOrderWord, 'desc');
    const orderNumberWithWrongInitialOrder = stringSorting(secondOrderWord, firstOrderWord, 'desc');
    const orderNumberWithEqualInitialOrder = stringSorting(firstOrderWord, firstOrderWord, 'desc');
    // Then
    expect(orderNumberWithRightInitialOrder).toBe(-1);
    expect(orderNumberWithWrongInitialOrder).toBe(1);
    expect(orderNumberWithEqualInitialOrder).toBe(0);
  });
});
