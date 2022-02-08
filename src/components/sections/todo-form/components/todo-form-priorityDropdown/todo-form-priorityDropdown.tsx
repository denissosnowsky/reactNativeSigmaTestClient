import React, { useContext, VFC } from 'react';
import { View } from 'react-native';

import { ButtonIcon } from '~components/common/button-icon';
import { ThemeContext } from '~contexts';
import { DropdownFilterType } from '~types/todo.types';
import styles from './todo-form-priorityDropdown.style';

export const TodoFormPriorityDropdown: VFC<Props> = ({
  priorityDropdown,
  nonChosenPriorityButtons,
}) => {
  const theme = useContext(ThemeContext);
  return (
    <>
      {priorityDropdown && (
        <View style={[styles.priorityDropdown, { backgroundColor: theme.listItemBG }]}>
          {nonChosenPriorityButtons!.map((btn, i) => (
            <ButtonIcon variant={btn.name} onPress={btn.action} key={i} />
          ))}
        </View>
      )}
    </>
  );
};

type Props = {
  priorityDropdown: boolean;
  nonChosenPriorityButtons: DropdownFilterType | undefined;
};
