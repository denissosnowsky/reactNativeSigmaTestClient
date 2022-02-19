import React, { VFC } from 'react';
import { View } from 'react-native';
import { DropdownFilterType, ImportantEnum, PriorirtIconsType } from '~types/todo.types';

import { ButtonIcon } from '~components/common/button-icon';
import { iconPickerImportantFilter } from '~utils/iconPickerImportantFilter';
import { chooseFromTwoOptionsByFlag } from '~utils/chooseFromTwoOptionsByFlag';
import styles from './todo-form-buttons.style';
import { TodoFormFilterPriority } from '../todo-form-filter-priority';

export const TodoFormButtons: VFC<Props> = ({
  isMultipleEditing,
  chosenPriority,
  currentTodoPriority,
  nonChosenPriorityButtons,
  isSaveButtonShouldBeShown,
  changeHandler,
  selectAllHandler,
  cancelAllHandler,
  todoEditDeleteModalModeOn,
}) => {
  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
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
        {isSaveButtonShouldBeShown && <ButtonIcon onPress={changeHandler} variant="save" />}
        {isMultipleEditing && <ButtonIcon onPress={selectAllHandler} variant="select-all" />}
        <ButtonIcon onPress={todoEditDeleteModalModeOn} variant="delete" />
        <ButtonIcon onPress={cancelAllHandler} variant="cancel" />
      </View>
      <View style={{ width: '100%', height: 50, alignItems: 'center' }}>
        {isSaveButtonShouldBeShown && (
          <TodoFormFilterPriority
            nonChosenPriorityButtons={nonChosenPriorityButtons}
            variant={chooseFromTwoOptionsByFlag(
              chosenPriority !== null,
              iconPickerImportantFilter(chosenPriority!),
              currentTodoPriority!,
            )}
            style={styles.priorityWrapper}
          />
        )}
      </View>
    </View>
  );
};

type Props = {
  isSaveButtonShouldBeShown: boolean;
  isMultipleEditing: boolean;
  chosenPriority: ImportantEnum | null;
  currentTodoPriority: PriorirtIconsType | undefined;
  nonChosenPriorityButtons: DropdownFilterType | undefined;
  changeHandler: () => void;
  selectAllHandler: () => void;
  cancelAllHandler: () => void;
  todoEditDeleteModalModeOn: () => void;
};

/* <View style={styles.priorityWrapper}> */
/* <ButtonIcon
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
          /> */
/* </View> */
