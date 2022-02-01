import { Keyboard } from 'react-native';

export const onSelectHandler = (
  isMultipleEditing: boolean,
  isCurrentItemEditing: boolean,
  deselectClb: () => void,
  selectClb: () => void,
  editOffClb: () => void,
) => {
  if (isMultipleEditing) {
    if (isCurrentItemEditing) {
      deselectClb();
    } else {
      selectClb();
    }
  } else {
    editOffClb();
  }
  Keyboard.dismiss();
};
