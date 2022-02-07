import { Keyboard } from 'react-native';

export const onSelectHandler = (
  isMultipleEditing: boolean,
  isCurrentItemEditing: boolean,
  deselect: () => void,
  select: () => void,
  cancelEdit: () => void,
) => {
  if (isMultipleEditing) {
    if (isCurrentItemEditing) {
      deselect();
    } else {
      select();
    }
  } else {
    cancelEdit();
  }
  Keyboard.dismiss();
};
