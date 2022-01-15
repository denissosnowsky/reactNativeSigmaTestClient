export const booleanSorting = (firstProp: boolean, secondProp: boolean, order: 'asc' | 'desc') => {
  if (firstProp > secondProp) {
    return order === 'asc' ? -1 : 1;
  }
  if (secondProp > firstProp) {
    return order === 'asc' ? 1 : -1;
  }
  return 0;
};
