import React, { useEffect, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';

import themeSelectors from '~store/theme/theme.selectors';
import todoSelectors from '~store/todo/todo.selectors';
import { Alert } from '~components/common/alert';
import { ThemeContext } from '~contexts';
import { themes } from '~global/themes';
import { TabNavigation } from '~navigation/tab-navigation';
import { Loading } from '~components/common/loading';
import authSelectors from '~store/auth/auth.selectors';
import { authThunks } from '~store/auth/thunks';
import styles from './screents.style';
import { Auth } from './auth';

export const Screens: VFC = () => {
  const dispatch = useDispatch();
  const todoError = useSelector(todoSelectors.error);
  const authError = useSelector(authSelectors.error);
  const isLightMode = useSelector(themeSelectors.isLightMode);
  const isLogged = useSelector(authSelectors.isLogged);
  const isInitializing = useSelector(authSelectors.isInitializing);
  const testMode = useSelector(authSelectors.testMode);
  const isUserActivated = useSelector(authSelectors.user).isActivated;

  useEffect(() => {
    dispatch(authThunks.authVerifyThunk());
  }, []);

  if (isInitializing) {
    return (
      <View style={styles.loading}>
        <Loading />
      </View>
    );
  }

  return (
    <ThemeContext.Provider value={isLightMode ? themes.light : themes.dark}>
      <View style={styles.container}>
        {(isLogged && isUserActivated) || testMode ? <TabNavigation /> : <Auth />}
        <Alert
          text={todoError ? 'Some error happened' : authError}
          status="error"
          isShown={Boolean(todoError || authError)}
        />
      </View>
    </ThemeContext.Provider>
  );
};
