export const onSelectHandler = (
  isMultipleEditing: boolean,
  isCurrentItemEditing: boolean,
  deselectClb: () => void,
  selectClb: () => void,
) => {
  if (isMultipleEditing) {
    if (isCurrentItemEditing) {
      deselectClb();
    } else {
      selectClb();
    }
  }
};
