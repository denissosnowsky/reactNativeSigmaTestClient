import React, { VFC } from 'react';

import { ButtonIcon } from '~components/common/button-icon';
import globalStyles from '~global/constants.style';

export const NonSolelyEditingButtons: VFC<Props> = ({
  isTodoSelectedOrCompleted,
  isMultipleEditingMode,
  onSelectTodoHandler,
  onCheckPressTodoHandle,
}) => {
  return (
    <>
      {isTodoSelectedOrCompleted ? (
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
    </>
  );
};

type Props = {
  isTodoSelectedOrCompleted: boolean;
  isMultipleEditingMode: boolean;
  onSelectTodoHandler: () => void;
  onCheckPressTodoHandle: () => void;
};
