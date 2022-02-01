export const onCancelEditingHandle = (
  isOneNonCompleteEditing: boolean,
  inputTextWasChanged: boolean,
  openModal: () => void,
  canelClb: () => void,
) => {
  if (isOneNonCompleteEditing && inputTextWasChanged) {
    openModal();
  } else {
    canelClb();
  }
};
