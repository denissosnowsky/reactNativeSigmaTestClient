import React, { VFC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import globalStyles from '~global/constants.style';
import { ButtonIcon } from '~components/common/button-icon';
import { DropdownFilterType, IconsNames } from '~types/todo.types';
import styles from './todo-form-filter-priority.style';
import { TodoFormSelector } from '../todo-form-selector/todo-form-selector';

export const TodoFormFilterPriority: VFC<Props> = ({
  variant,
  nonChosenPriorityButtons,
  style,
}) => {
  return (
    <View style={[styles.filterWrapper, style]}>
      <ButtonIcon variant={variant} size={globalStyles.ICON_SM_SIZE} style={styles.selectorIcon} />
      <TodoFormSelector optionsArray={nonChosenPriorityButtons ?? []} initName={variant} />
    </View>
  );
};

type Props = {
  variant: IconsNames;
  nonChosenPriorityButtons: DropdownFilterType | undefined;
  style?: StyleProp<ViewStyle>;
};
