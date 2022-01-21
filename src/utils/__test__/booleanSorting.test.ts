import { booleanSorting } from '../booleanSorting';

describe('Boolean sorting util function', () => {
  it('should sort boolean values in ascending order', () => {
    // When
    const orderNumberWithRightInitialOrder = booleanSorting(true, false, 'asc');
    const orderNumberWithWrongInitialOrder = booleanSorting(false, true, 'asc');
    const orderNumberWithEqualInitialOrder = booleanSorting(true, true, 'asc');
    // Then
    expect(orderNumberWithRightInitialOrder).toBe(-1);
    expect(orderNumberWithWrongInitialOrder).toBe(1);
    expect(orderNumberWithEqualInitialOrder).toBe(0);
  });

  it('should sort boolean values in descending order', () => {
    // When
    const orderNumberWithRightInitialOrder = booleanSorting(false, true, 'desc');
    const orderNumberWithWrongInitialOrder = booleanSorting(true, false, 'desc');
    const orderNumberWithEqualInitialOrder = booleanSorting(true, true, 'desc');
    // Then
    expect(orderNumberWithRightInitialOrder).toBe(-1);
    expect(orderNumberWithWrongInitialOrder).toBe(1);
    expect(orderNumberWithEqualInitialOrder).toBe(0);
  });
});
