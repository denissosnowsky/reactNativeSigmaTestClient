export const cancelHandler = (
  dispatchClb: () => void,
  clearFormHandler: () => void,
  closeModal: () => void,
) => {
  dispatchClb();
  clearFormHandler();
  closeModal();
};
