import React, { useContext, VFC } from 'react';
import { Button } from 'native-base';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { authThunks } from '~store/auth/thunks';
import { authActions } from '~store/auth';
import { Theme } from '~components/containers/theme';
import authSelectors from '~store/auth/auth.selectors';
import { todoActions } from '~store/todo';
import { ThemeContext } from '~contexts';
import styles from './profile.style';

const Profile: VFC = () => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();

  const testMode = useSelector(authSelectors.testMode);

  const onSignOut = () => {
    if (testMode) {
      dispatch(authActions.authTestModeOff());
      dispatch(todoActions.todoResetAll());
    } else {
      dispatch(authThunks.authSignOutThunk());
    }
  };

  return (
    <Theme scaleAndOpacity={1}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Button variant="unstyled" onPress={onSignOut} size="lg">
          Sign out
        </Button>
      </View>
    </Theme>
  );
};

export default Profile;
