import React, { useContext, VFC } from 'react';
import { Text, View } from 'react-native';
import { Theme } from '~components/containers/theme';
import { ThemeContext } from '~contexts';

import styles from './profile.style';

export const Profile: VFC = () => {
  const theme = useContext(ThemeContext);
  return (
    <Theme>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text>Profile Page</Text>
      </View>
    </Theme>
  );
};
