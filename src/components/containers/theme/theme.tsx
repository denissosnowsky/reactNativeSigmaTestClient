import React, { FC } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { themeActions } from '~store/theme';
import themeSelectors from '~store/theme/theme.selectors';
import styles from './theme.styles';
import { ThemeIcon } from './components/theme-icon';

export const Theme: FC<Props> = ({ children, scaleAndOpacity }) => {
  const dispatch = useDispatch();
  const isLightMode = useSelector(themeSelectors.isLightMode);

  const switchHandler = () => {
    dispatch(themeActions.switchThemeOn());
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
          <ThemeIcon isLightMode={isLightMode} />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

type Props = {
  scaleAndOpacity: Animated.Value | number;
};
