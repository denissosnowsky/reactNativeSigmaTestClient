import React, { VFC } from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import globalStyles from '~global/constants.style';

export const ButtonIcon: VFC<Props> = ({ onPress, variant }) => (
  <TouchableOpacity onPress={onPress}>
    {variant === 'add' ? (
      <Ionicons name="add-circle" size={50} color={globalStyles.SUCCESS_COLOR} />
    ) : variant === 'delete' ? (
      <MaterialCommunityIcons name="delete-circle" size={50} color={globalStyles.DELETE_COLOR} />
    ) : variant === 'save' ? (
      <MaterialCommunityIcons name="content-save" size={50} color={globalStyles.MAIN_COLOR} />
    ) : variant === 'cancel' ? (
      <MaterialCommunityIcons name="cancel" size={50} color={globalStyles.CANCEL_COLOR} />
    ) : null}
  </TouchableOpacity>
);

type Props = {
  onPress?: () => void;
  variant: 'add' | 'delete' | 'save' | 'cancel';
};
