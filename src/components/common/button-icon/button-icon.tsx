import React, { useCallback, VFC } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import globalStyles from '~global/constants.style';
import { IconsNames, TodoButtonsNameType } from '~types/todo.types';
import styles from './button-icon.style';

export const ButtonIcon: VFC<Props> = ({ onPress, variant, size }) => {
  const iconNamePicker = useCallback(
    (
      btnVariant: typeof variant,
    ): {
      name: TodoButtonsNameType;
      color: string;
    } => {
      switch (btnVariant) {
        case 'add':
          return { name: 'plus-circle', color: globalStyles.SUCCESS_COLOR };
        case 'delete':
          return { name: 'delete-circle', color: globalStyles.DELETE_COLOR };
        case 'save':
          return { name: 'content-save', color: globalStyles.LIGHT_MAIN_COLOR };
        case 'select-all':
          return {
            name: 'checkbox-multiple-marked-circle',
            color: globalStyles.SUCCESS_COLOR,
          };
        case 'default-hide':
          return { name: 'circle-off-outline', color: globalStyles.ICON_DEF_COLOR };
        case 'filter-opened':
          return { name: 'filter-menu-outline', color: globalStyles.ICON_DEF_COLOR };
        case 'filter-closed':
          return { name: 'filter', color: globalStyles.ICON_DEF_COLOR };
        case 'down':
          return { name: 'menu-down', color: globalStyles.ICON_DEF_COLOR };
        case 'up':
          return { name: 'menu-up', color: globalStyles.ICON_DEF_COLOR };
        case 'circle-outline':
          return { name: 'checkbox-blank-circle-outline', color: globalStyles.ICON_DEF_COLOR };
        case 'check':
          return { name: 'check-circle', color: globalStyles.SUCCESS_COLOR };
        case 'high-priority':
          return { name: 'bookmark', color: globalStyles.HIGH_P_COLOR };
        case 'normal-priority':
          return { name: 'bookmark', color: globalStyles.NORMAL_P_COLOR };
        case 'low-priority':
          return { name: 'bookmark', color: globalStyles.LOW_P_COLOR };
        case 'none-priority':
          return { name: 'bookmark-outline', color: globalStyles.ICON_DEF_COLOR };
        case 'cancel':
        default:
          return { name: 'cancel', color: globalStyles.LIGHT_CANCEL_COLOR };
      }
    },
    [],
  );

  return (
    <TouchableOpacity onPress={onPress} accessibilityRole="button" style={styles.wrapper}>
      <MaterialCommunityIcons
        name={iconNamePicker(variant).name}
        size={size ?? globalStyles.ICON_MED_SIZE}
        color={iconNamePicker(variant).color}
      />
    </TouchableOpacity>
  );
};

type Props = {
  onPress?: () => void;
  size?: number;
  variant: IconsNames;
};
