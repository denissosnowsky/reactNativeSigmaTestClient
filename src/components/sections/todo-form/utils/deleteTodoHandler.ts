export const deleteTodoHandler = (
  dispatchClb: () => void,
  clearFormHandler: () => void,
  closeModal: () => void,
) => {
  dispatchClb();
  clearFormHandler();
  closeModal();
};
