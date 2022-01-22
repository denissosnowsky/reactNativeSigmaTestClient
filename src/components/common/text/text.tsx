import React, { FC } from 'react';
import { Text } from 'native-base';

import globalStyles from '~global/constants.style';

export const BlueText: FC<Props> = ({ children, fs, isCrossed }) => (
  <Text
    style={{ color: globalStyles.MAIN_COLOR, fontSize: fs, lineHeight: fs }}
    strikeThrough={isCrossed}
  >
    {children}
  </Text>
);

type Props = {
  fs?: number;
  isCrossed?: boolean;
};
