import React, { FC, useContext } from 'react';
import { Text } from 'native-base';
import { StyleProp, TextStyle } from 'react-native';

import { ThemeContext } from '~contexts';

export const BlueText: FC<Props> = ({ children, fs, isCrossed, style }) => {
  const theme = useContext(ThemeContext);

  return (
    <Text
      style={[{ color: theme.textColor, fontSize: fs, lineHeight: fs }, style]}
      strikeThrough={isCrossed}
    >
      {children}
    </Text>
  );
};

type Props = {
  fs?: number;
  isCrossed?: boolean;
  style?: StyleProp<TextStyle>;
};
