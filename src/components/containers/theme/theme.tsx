import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { themeActions } from '~store/theme';
import themeSelectors from '~store/theme/theme.selectors';
import { dispatchSelection } from '~utils/dispatchSelection';
import styles from './theme.styles';
import { switchThemeHandler } from './utils/switchThemeHandler';

export const Theme: FC = ({ children }) => {
  const dispatch = useDispatch();
  const isLightMode = useSelector(themeSelectors.isLightMode);

  const switchHandler = () => {
    switchThemeHandler(dispatchSelection(dispatch, themeActions.switchThemeOn()));
  };

  return (
    <>
      {children}
      <View style={styles.wrapepr}>
        <TouchableOpacity onPress={switchHandler}>
          {isLightMode ? (
            <Ionicons name="md-sunny" size={40} color="orange" testID="sun" />
          ) : (
            <Ionicons name="moon" size={40} color="#fff" testID="moon" />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};
