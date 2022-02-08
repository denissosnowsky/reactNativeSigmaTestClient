import React, { VFC } from 'react';
import { ActivityIndicator, View } from 'react-native';

import globalStyle from '~global/constants.style';
import styles from './loading.style';

export const Loading: VFC = () => {
  return (
    <View style={styles.wrapper} testID="init">
      <ActivityIndicator size="large" color={globalStyle.LIGHT_MAIN_COLOR} testID="todo-loading" />
    </View>
  );
};
