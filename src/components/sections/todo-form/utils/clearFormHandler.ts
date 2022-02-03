import { KeyboardStatic } from 'react-native';
import { ImportantEnum } from '~types/todo.types';

export const clearFormHandler = (
  setFormValue: (arg: string) => void,
  Keyboard: KeyboardStatic,
  setChosenPriority: (arg: ImportantEnum | null) => void,
  priority: ImportantEnum | null,
) => {
  return () => {
    setFormValue('');
    setChosenPriority(priority);
    Keyboard.dismiss();
  };
};
