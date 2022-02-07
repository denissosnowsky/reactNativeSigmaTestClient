import React, { VFC } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleProp, TextStyle, TouchableOpacity } from 'react-native';

import globalStyles from '~global/constants.style';
import { IconsNames } from '~types/todo.types';
import styles from './button-icon.style';
import { iconNamePicker } from './utils/iconNamePicker';

export const ButtonIcon: VFC<Props> = ({ onPress, variant, size, style }) => {
  return (
    <TouchableOpacity onPress={onPress} accessibilityRole="button" style={styles.wrapper}>
      <MaterialCommunityIcons
        name={iconNamePicker(variant).name}
        color={iconNamePicker(variant).color}
        size={size ?? globalStyles.ICON_MED_SIZE}
        style={style}
      />
    </TouchableOpacity>
  );
};

type Props = {
  variant: IconsNames;
  size?: number;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
};
