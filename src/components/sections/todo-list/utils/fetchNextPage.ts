export const fetchNextPage = (isCanLoadMorePages: boolean, dispatch: () => void) => {
  return () => {
    if (isCanLoadMorePages) {
      dispatch();
    }
  };
};
