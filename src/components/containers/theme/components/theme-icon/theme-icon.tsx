import { Ionicons } from '@expo/vector-icons';
import React, { VFC } from 'react';

import globalStyles from '~global/constants.style';

export const ThemeIcon: VFC<Props> = ({ isLightMode }) => {
  return (
    <>
      {isLightMode ? (
        <Ionicons name="md-sunny" size={globalStyles.ICON_MED_SIZE} color="orange" testID="sun" />
      ) : (
        <Ionicons name="moon" size={globalStyles.ICON_MED_SIZE} color="#fff" testID="moon" />
      )}
    </>
  );
};

type Props = {
  isLightMode: boolean;
};
