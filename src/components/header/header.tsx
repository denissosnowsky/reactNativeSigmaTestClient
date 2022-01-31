import React, { VFC } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import { TitleSVG } from '~components/common/svg';
import { useChangeColor } from '~hooks/useChangeColor';
import styles from './header.style';

export const Header: VFC = () => {
  const [color, setColor] = useChangeColor();

  return (
    <TouchableWithoutFeedback onPress={setColor} accessibilityRole="button">
      <View style={styles.wrapepr}>
        <TitleSVG color={color} />
      </View>
    </TouchableWithoutFeedback>
  );
};
