export const deleteTodoHandler = (
  dispatchClb: () => void,
  clearFormHandler: () => void,
  closeModal: (arg: boolean) => void,
) => {
  dispatchClb();
  clearFormHandler();
  closeModal(false);
};
