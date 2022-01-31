import React, { FC, useState, Ref, forwardRef, useContext } from 'react';
import { Input as InputNB } from 'native-base';
import { StyleProp, TextStyle } from 'react-native';

import globalStyles from '~global/constants.style';
import { ThemeContext } from '~contexts';
import styles from './input.style';

export const Input: FC<Props> = forwardRef(
  ({ placeholder, value, underlined, style, onChange }, ref: Ref<HTMLInputElement>) => {
    const [text, setText] = useState('');
    const theme = useContext(ThemeContext);

    const onChangeHandler = (targetValue: string) => {
      setText(targetValue);
      if (onChange) {
        onChange(targetValue);
      }
    };

    return (
      <InputNB
        style={[
          styles.input,
          { color: theme.textColor },
          underlined && {
            borderBottomColor: globalStyles.LIGHT_BORDER_COLOR,
          },
          style,
        ]}
        placeholder={placeholder}
        variant="underlined"
        placeholderTextColor={theme.placeholder}
        value={value ?? text}
        onChangeText={(targetValue) => onChangeHandler(targetValue)}
        ref={ref}
      />
    );
  },
);

type Props = {
  placeholder: string;
  onChange?: (value: string) => void;
  value?: string;
  underlined?: boolean;
  ref?: Ref<HTMLInputElement>;
  style?: StyleProp<TextStyle>;
};
