export const stringSorting = (firstProp: string, secondProp: string, order: 'asc' | 'desc') => {
  if (firstProp > secondProp) {
    return order === 'asc' ? 1 : -1;
  }
  if (secondProp > firstProp) {
    return order === 'asc' ? -1 : 1;
  }
  return 0;
};
