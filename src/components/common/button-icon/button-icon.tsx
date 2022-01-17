import React, { useCallback, VFC } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import globalStyles from '~global/constants.style';
import { TodoButtonsNameType } from '~types/todo.types';

export const ButtonIcon: VFC<Props> = ({ onPress, variant }) => {
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
          return { name: 'content-save', color: globalStyles.MAIN_COLOR };
        default:
          return { name: 'cancel', color: globalStyles.CANCEL_COLOR };
      }
    },
    [],
  );

  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons
        name={iconNamePicker(variant).name}
        size={globalStyles.ICON_MED_SIZE}
        color={iconNamePicker(variant).color}
      />
    </TouchableOpacity>
  );
};

type Props = {
  onPress?: () => void;
  variant: 'add' | 'delete' | 'save' | 'cancel';
};
