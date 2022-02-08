import React, { memo, VFC } from 'react';
import { ActivityIndicator, View } from 'react-native';

import globalStyle from '~global/constants.style';
import styles from './todo-list-footer.style';

export const TodoListFooter: VFC<Props> = memo(({ isLoading }) => {
  return (
    <View style={styles.wrapper}>
      {isLoading && (
        <ActivityIndicator size="small" color={globalStyle.LIGHT_MAIN_COLOR} testID="loading" />
      )}
    </View>
  );
});

type Props = {
  isLoading: boolean;
};
