import React, { FC, useState, Ref, forwardRef, useContext } from 'react';
import { Input as InputNB } from 'native-base';
import { NativeSyntheticEvent, StyleProp, TextInputFocusEventData, TextStyle } from 'react-native';

import globalStyles from '~global/constants.style';
import { ThemeContext } from '~contexts';
import styles from './input.style';

export const Input: FC<Props> = forwardRef(
  (
    {
      placeholder,
      value,
      isUnderlined,
      style,
      secureTextEntry,
      onChange,
      onFocus,
      onBlur,
      onChangeNative,
    },
    ref: Ref<HTMLInputElement>,
  ) => {
    const [text, setText] = useState('');
    const theme = useContext(ThemeContext);

    const onChangeHandler = (targetValue: string) => {
      setText(targetValue);
      if (onChange) onChange(targetValue);
    };

    return (
      <InputNB
        style={[
          styles.input,
          { color: theme.textColor },
          isUnderlined && {
            borderBottomColor: globalStyles.LIGHT_BORDER_COLOR,
          },
          style,
        ]}
        placeholder={placeholder}
        variant="underlined"
        placeholderTextColor={theme.placeholder}
        value={value ?? text}
        onChangeText={(targetValue) => onChangeHandler(targetValue)}
        onChange={(e) => onChangeNative && onChangeNative(e.nativeEvent.text)}
        ref={ref}
        onFocus={onFocus}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
      />
    );
  },
);

type Props = {
  placeholder: string;
  ref?: Ref<HTMLInputElement>;
  value?: string;
  style?: StyleProp<TextStyle>;
  isUnderlined?: boolean;
  secureTextEntry?: boolean;
  onChange?: (value: string) => void;
  onChangeNative?: (e: string) => void;
  onFocus?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined;
  onBlur?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined;
};
