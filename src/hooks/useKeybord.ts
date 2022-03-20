import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

export const useKeybord = (hideListener?: (arg: boolean) => void): boolean => {
  const [keyboardState, setKeyboardState] = useState<boolean>(false);

  useEffect(() => {
    const { remove: removeShow } = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardState(true),
    );
    const { remove: removeHide } = Keyboard.addListener('keyboardDidHide', () => {
      setTimeout(() => {
        setKeyboardState(false);
        if (hideListener) {
          hideListener(false);
        }
      }, 200);
    });

    return () => {
      removeShow();
      removeHide();
    };
  }, []);

  return keyboardState;
};
