import React, { FC, useMemo } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  AccessibilityRole,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import globalStyles from '~global/constants.style';
import { IconsNames } from '~types/todo.types';
import styles from './button-icon.style';
import { iconNamePicker } from './utils/iconNamePicker';

export const ButtonIcon: FC<Props> = ({
  onPress,
  variant,
  size,
  style,
  testID,
  hasOpacity = true,
}) => {
  const Icon = useMemo(() => {
    return (
      <MaterialCommunityIcons
        name={iconNamePicker(variant).name}
        color={iconNamePicker(variant).color}
        size={size ?? globalStyles.ICON_MED_SIZE}
        style={style}
        testID={testID}
      />
    );
  }, [variant, size, testID, style]);

  const componentsProps = {
    onPress,
    accessibilityRole: 'button' as AccessibilityRole | undefined,
    style: styles.wrapper,
  };

  return (
    <>
      {hasOpacity ? (
        <TouchableOpacity {...componentsProps}>{Icon}</TouchableOpacity>
      ) : (
        <TouchableWithoutFeedback {...componentsProps}>{Icon}</TouchableWithoutFeedback>
      )}
    </>
  );
};

type Props = {
  variant: IconsNames;
  size?: number;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  testID?: string;
  hasOpacity?: boolean;
};
