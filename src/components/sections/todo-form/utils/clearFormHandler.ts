import { KeyboardStatic } from 'react-native';
import { ImportantEnum } from '~types/todo.types';

export const clearFormHandler = (
  setFormValue: (arg: string) => void,
  Keyboard: KeyboardStatic,
  setTemporaryNewPriority: (arg: string) => void,
  setChosenPriority: (arg: ImportantEnum) => void,
  priority: ImportantEnum,
) => {
  return () => {
    setFormValue('');
    setTemporaryNewPriority('');
    setChosenPriority(priority);
    Keyboard.dismiss();
  };
};
