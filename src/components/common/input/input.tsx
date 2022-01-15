import React, { FC, useState, Ref, forwardRef } from 'react';
import { Input as InputNB } from 'native-base';

import globalStyles from '~global/constants.style';
import styles from './input.style';

export const Input: FC<Props> = forwardRef(
  ({ placeholder, value, underlined, onChange }, ref: Ref<HTMLInputElement>) => {
    const [text, setText] = useState('');
    const onChangeHandler = (targetValue: string) => {
      setText(targetValue);
      if (onChange) {
        onChange(targetValue);
      }
    };

    return (
      <InputNB
        style={[styles.input, underlined && { borderBottomColor: globalStyles.BORDER_COLOR }]}
        placeholder={placeholder}
        variant="underlined"
        placeholderTextColor={globalStyles.PLACEHOLDER_COLOR}
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
};
