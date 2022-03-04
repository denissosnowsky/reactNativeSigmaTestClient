import React, { VFC } from 'react';
import { View } from 'react-native';

import { ButtonIcon } from '~components/common/button-icon';
import globalStyles from '~global/constants.style';
import { NonSolelyEditingButtons } from './components/nonSolelyEditingButtons/nonSolelyEditingButtons';
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
      ) : (
        <NonSolelyEditingButtons
          isTodoSelectedOrCompleted={isTodoSelectedOrCompleted}
          isMultipleEditingMode={isMultipleEditingMode}
          onSelectTodoHandler={onSelectTodoHandler}
          onCheckPressTodoHandle={onCheckPressTodoHandle}
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
