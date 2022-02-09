import { Keyboard } from 'react-native';

import { ImportantEnum } from '~types/todo.types';

export const onSelectHandler = (
  isMultipleEditing: boolean,
  isCurrentItemEditing: boolean,
  deselect: () => void,
  select: () => void,
  cancelEdit: () => void,
  setChosenPriority: (arg: ImportantEnum | null) => void,
) => {
  if (isMultipleEditing) {
    if (isCurrentItemEditing) {
      deselect();
      setChosenPriority(null);
    } else {
      select();
    }
  } else {
    cancelEdit();
  }
  Keyboard.dismiss();
};
