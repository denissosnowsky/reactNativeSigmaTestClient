import React, { FC } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { themeActions } from '~store/theme';
import themeSelectors from '~store/theme/theme.selectors';
import { dispatchSelection } from '~utils/dispatchSelection';
import globalStyles from '~global/constants.style';
import styles from './theme.styles';
import { switchThemeHandler } from './utils/switchThemeHandler';

export const Theme: FC<Props> = ({ children, scaleAndOpacity }) => {
  const dispatch = useDispatch();
  const isLightMode = useSelector(themeSelectors.isLightMode);

  const switchHandler = () => {
    switchThemeHandler(dispatchSelection(dispatch, themeActions.switchThemeOn()));
  };

  return (
    <>
      {children}
      <Animated.View
        style={[
          styles.wrapepr,
          { transform: [{ scale: scaleAndOpacity }], opacity: scaleAndOpacity },
        ]}
      >
        <TouchableOpacity onPress={switchHandler}>
          {isLightMode ? (
            <Ionicons
              name="md-sunny"
              size={globalStyles.ICON_MED_SIZE}
              color="orange"
              testID="sun"
            />
          ) : (
            <Ionicons name="moon" size={globalStyles.ICON_MED_SIZE} color="#fff" testID="moon" />
          )}
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

type Props = {
  scaleAndOpacity: Animated.Value | number;
};
