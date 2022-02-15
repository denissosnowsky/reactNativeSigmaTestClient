import React, { VFC } from 'react';

import { Animated, View } from 'react-native';
import { useSelector } from 'react-redux';
import { ButtonIcon } from '~components/common/button-icon';
import { Input } from '~components/common/input';
import globalStyles from '~global/constants.style';
import authSelectors from '~store/auth/auth.selectors';
import { TodoFormLetter } from '../todo-form-letter';
import styles from './todo-form-input.style';

export const TodoFormInput: VFC<Props> = ({
  letterScaleAndOpacity,
  letterWidth,
  titleColor,
  filter,
  formValue,
  setTitleColor,
  setFormValue,
  filterOnChange,
  addOnChange,
}) => {
  const testMode = useSelector(authSelectors.testMode);

  return (
    <View style={styles.formWrapper}>
      <TodoFormLetter
        letterScaleAndOpacity={letterScaleAndOpacity}
        letterWidth={letterWidth}
        titleColor={titleColor}
        setTitleColor={setTitleColor}
      />
      {!testMode && (
        <ButtonIcon
          variant={filter ? 'filter-opened' : 'filter-closed'}
          size={globalStyles.ICON_SM_SIZE}
          onPress={filterOnChange}
        />
      )}
      <Input
        placeholder="Add new todo"
        onChange={setFormValue}
        value={formValue}
        isUnderlined
        style={styles.input}
      />
      <ButtonIcon onPress={addOnChange} variant="add" />
    </View>
  );
};

type Props = {
  filter: boolean;
  formValue: string;
  titleColor: string;
  letterWidth: Animated.Value;
  letterScaleAndOpacity: Animated.Value;
  setTitleColor: () => void;
  addOnChange: () => void;
  filterOnChange: () => void;
  setFormValue: (value: string) => void;
};
