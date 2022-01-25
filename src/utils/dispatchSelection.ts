export const dispatchSelection = (dispatch: (arg: unknown) => void, action: unknown) => {
  return () => dispatch(action);
};
