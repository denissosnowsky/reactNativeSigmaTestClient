export const changeTodoHandler = (dispatchClb: () => void, clearFormHandler: () => void) => {
  dispatchClb();
  clearFormHandler();
};
