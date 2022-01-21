export const cancelHandler = (
  dispatchClb: () => void,
  clearFormHandler: () => void,
  closeModal: (arg: boolean) => void,
) => {
  dispatchClb();
  clearFormHandler();
  closeModal(false);
};
