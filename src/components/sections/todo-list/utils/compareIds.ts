export const compareIds = (id: number) => {
  return (arr: unknown & { id: number }) => arr.id === id;
};
