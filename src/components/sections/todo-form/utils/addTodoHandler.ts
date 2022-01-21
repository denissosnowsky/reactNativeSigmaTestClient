export const addTodoHandler = (
  formValue: string,
  dispatchClb: () => void,
  clearFormHandler: () => void,
) => {
  if (formValue) {
    dispatchClb();
    clearFormHandler();
  }
};
