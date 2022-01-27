import React, { VFC } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';

import themeSelectors from '~store/theme/theme.selectors';
import todoSelectors from '~store/todo/todo.selectors';
import { Alert } from '~components/common/alert';
import { ThemeContext } from '~contexts';
import { themes } from '~global/themes';
import styles from './screents.style';
import { Todos } from './todos';

export const Screens: VFC = () => {
  const error = useSelector(todoSelectors.error);
  const isLightMode = useSelector(themeSelectors.isLightMode);

  return (
    <ThemeContext.Provider value={isLightMode ? themes.light : themes.dark}>
      <View style={styles.container}>
        <Todos />
        <Alert text="Some error happened" status="error" isShown={Boolean(error)} />
      </View>
    </ThemeContext.Provider>
  );
};
