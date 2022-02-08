import React, { VFC } from 'react';
import { View } from 'react-native';
import { DropdownFilterType, ImportantEnum, PriorirtIconsType } from '~types/todo.types';

import { ButtonIcon } from '~components/common/button-icon';
import { iconPickerImportantFilter } from '~utils/iconPickerImportantFilter';
import { chooseFromTwoOptionsByFlag } from '~utils/chooseFromTwoOptionsByFlag';
import styles from './todo-form-buttons.style';
import { TodoFormPriorityDropdown } from '../todo-form-priorityDropdown';

export const TodoFormButtons: VFC<Props> = ({
  isMultipleEditing,
  priorityDropdown,
  chosenPriority,
  currentTodoPriority,
  nonChosenPriorityButtons,
  isSaveButtonShouldBeShown,
  changeHandler,
  selectAllHandler,
  cancelAllHandler,
  setPriorityDropdown,
  todoEditDeleteModalModeOn,
}) => {
  return (
    <View
      style={[
        chooseFromTwoOptionsByFlag(
          isSaveButtonShouldBeShown || isMultipleEditing,
          styles.fourBtnEditBlock,
          styles.twoBtnEditBlock,
        ),
      ]}
      testID="btnWrapper"
    >
      {isSaveButtonShouldBeShown && (
        <View style={styles.priorityWrapper}>
          <ButtonIcon
            onPress={setPriorityDropdown}
            variant={chooseFromTwoOptionsByFlag(
              chosenPriority !== null,
              iconPickerImportantFilter(chosenPriority!),
              currentTodoPriority!,
            )}
          />
          <TodoFormPriorityDropdown
            priorityDropdown={priorityDropdown}
            nonChosenPriorityButtons={nonChosenPriorityButtons}
          />
        </View>
      )}
      {isSaveButtonShouldBeShown && <ButtonIcon onPress={changeHandler} variant="save" />}
      {isMultipleEditing && <ButtonIcon onPress={selectAllHandler} variant="select-all" />}
      <ButtonIcon onPress={todoEditDeleteModalModeOn} variant="delete" />
      <ButtonIcon onPress={cancelAllHandler} variant="cancel" />
    </View>
  );
};

type Props = {
  isSaveButtonShouldBeShown: boolean;
  isMultipleEditing: boolean;
  priorityDropdown: boolean;
  chosenPriority: ImportantEnum | null;
  currentTodoPriority: PriorirtIconsType | undefined;
  nonChosenPriorityButtons: DropdownFilterType | undefined;
  changeHandler: () => void;
  selectAllHandler: () => void;
  cancelAllHandler: () => void;
  todoEditDeleteModalModeOn: () => void;
  setPriorityDropdown: () => void;
};
