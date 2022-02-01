export const changeTodoHandler = (dispatchClb: () => void, closeModal: () => void) => {
  dispatchClb();
  closeModal();
};
