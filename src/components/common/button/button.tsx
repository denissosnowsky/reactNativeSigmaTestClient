import React, { useContext, VFC } from 'react';
import { Button as ButtonNB } from 'native-base';
import { GestureResponderEvent, StyleProp, Text, ViewStyle } from 'react-native';

import { ThemeContext } from '~contexts';
import styles from './button.style';

export const Button: VFC<Props> = ({ name, style, onPress }) => {
  const theme = useContext(ThemeContext);
  return (
    <ButtonNB
      style={[styles.button, style, { backgroundColor: theme.listItemBG }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: theme.textColor }]}>{name}</Text>
    </ButtonNB>
  );
};

type Props = {
  name: string;
  style?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
};
