import React, { VFC } from 'react';
import { StyleProp, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';

import { TitleSVG } from '~components/common/svg';
import { useChangeColor } from '~hooks/useChangeColor';
import styles from './header.style';

export const Header: VFC<Props> = ({ style }) => {
  const [color, setColor] = useChangeColor();

  return (
    <TouchableWithoutFeedback onPress={setColor} accessibilityRole="button">
      <View style={[styles.wrapepr, style]}>
        <TitleSVG color={color} />
      </View>
    </TouchableWithoutFeedback>
  );
};

type Props = {
  style?: StyleProp<ViewStyle>;
};
