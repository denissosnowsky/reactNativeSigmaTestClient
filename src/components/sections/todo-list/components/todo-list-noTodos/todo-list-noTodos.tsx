import React, { VFC } from 'react';
import { View } from 'react-native';

import { BlueText } from '~components/common/text';
import globalStyle from '~global/constants.style';
import styles from './todo-list-noTodos.style';

export const TodoListNoTodos: VFC = () => {
  return (
    <View style={styles.wrapper}>
      <BlueText fs={globalStyle.BIG_FS}>No todos found</BlueText>
    </View>
  );
};
