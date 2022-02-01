export const cancelHandler = (dispatchClb: () => void, closeModal: () => void) => {
  dispatchClb();
  closeModal();
};
