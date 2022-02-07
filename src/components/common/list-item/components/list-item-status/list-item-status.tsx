import React, { VFC } from 'react';
import { View } from 'react-native';

import { ButtonIcon } from '~components/common/button-icon';
import globalStyles from '~global/constants.style';
import styles from './list-item-status.style';

export const ListItemStatus: VFC<Props> = ({
  isTodoSolelyEditing,
  isTodoSelectedOrCompleted,
  isMultipleEditingMode,
  onSelectTodoHandler,
  onCheckPressTodoHandle,
}) => {
  return (
    <View style={styles.complete}>
      {isTodoSolelyEditing ? (
        <ButtonIcon testID="pencil" variant="pencil" size={globalStyles.ICON_EXSM_SIZE} />
      ) : isTodoSelectedOrCompleted ? (
        <ButtonIcon
          variant="check"
          onPress={isMultipleEditingMode ? onSelectTodoHandler : onCheckPressTodoHandle}
          size={globalStyles.ICON_SM_SIZE}
          testID="check"
          hasOpacity={false}
        />
      ) : (
        <ButtonIcon
          variant="circle-outline"
          onPress={isMultipleEditingMode ? onSelectTodoHandler : onCheckPressTodoHandle}
          size={globalStyles.ICON_SM_SIZE}
          testID="circle-blank"
          hasOpacity={false}
        />
      )}
    </View>
  );
};

type Props = {
  isTodoSolelyEditing: boolean;
  isTodoSelectedOrCompleted: boolean;
  isMultipleEditingMode: boolean;
  onSelectTodoHandler: () => void;
  onCheckPressTodoHandle: () => void;
};
