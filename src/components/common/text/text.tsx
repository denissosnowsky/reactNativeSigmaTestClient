import React, { FC, useContext } from 'react';
import { Text } from 'native-base';

import { ThemeContext } from '~contexts';

export const BlueText: FC<Props> = ({ children, fs, isCrossed }) => {
  const theme = useContext(ThemeContext);

  return (
    <Text
      style={{ color: theme.textColor, fontSize: fs, lineHeight: fs }}
      strikeThrough={isCrossed}
    >
      {children}
    </Text>
  );
};

type Props = {
  fs?: number;
  isCrossed?: boolean;
};
