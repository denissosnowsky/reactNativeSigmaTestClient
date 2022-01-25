import { KeyboardStatic } from 'react-native';

export const clearFormHandler = (setFormValue: (arg: string) => void, Keyboard: KeyboardStatic) => {
  return () => {
    setFormValue('');
    Keyboard.dismiss();
  };
};
