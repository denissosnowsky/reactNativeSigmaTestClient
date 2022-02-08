export const cancelHandler = (
  dispatch: () => void,
  clearFormHandler: () => void,
  closeModal: () => void,
) => {
  dispatch();
  clearFormHandler();
  closeModal();
};
