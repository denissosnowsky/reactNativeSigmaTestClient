import { Keyboard } from 'react-native';

import { ImportantEnum } from '~types/todo.types';

export const clearFormHandler = (
  setFormValue: (arg: string) => void,
  setChosenPriority: (arg: ImportantEnum | null) => void,
  priority: ImportantEnum | null,
) => {
  setFormValue('');
  setChosenPriority(priority);
  Keyboard.dismiss();
};
