export const addTodoHandler = (
  formValue: string,
  dispatch: () => void,
  clearFormHandler: () => void,
) => {
  if (formValue) {
    dispatch();
    clearFormHandler();
  }
};
