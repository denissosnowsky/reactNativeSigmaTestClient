import React, { useContext, useState, VFC } from 'react';
import { Button } from 'native-base';
import { Image, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';

import { authThunks } from '~store/auth/thunks';
import { authActions } from '~store/auth';
import { Theme } from '~components/containers/theme';
import authSelectors from '~store/auth/auth.selectors';
import { todoActions } from '~store/todo';
import { ThemeContext } from '~contexts';
import { ButtonIcon } from '~components/common/button-icon';
import globalStyles from '~global/constants.style';
import { Loading } from '~components/common/loading';
import styles from './profile.style';
import { ProfilePhoto } from './components/profile-photo/profile-photo';
import { ProflieInfo } from './components/profile-info/profile-info';

const Profile: VFC = () => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();

  const testMode = useSelector(authSelectors.testMode);
  const isLoading = useSelector(authSelectors.isLoading);

  const onSignOut = () => {
    if (testMode) {
      dispatch(authActions.authTestModeOff());
      dispatch(todoActions.todoResetAll());
    } else {
      dispatch(authThunks.authSignOutThunk());
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Loading />
      </View>
    );
  }

  return (
    <Theme scaleAndOpacity={1}>
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
        <ButtonIcon
          variant="logout"
          onPress={onSignOut}
          size={globalStyles.ICON_SM_SIZE}
          style={styles.logout}
        />
        <View style={styles.wrapper}>
          <ProfilePhoto />
          <ProflieInfo />
        </View>
      </ScrollView>
    </Theme>
  );
};

export default Profile;
