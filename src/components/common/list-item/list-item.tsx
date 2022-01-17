import React, { Ref, useEffect, useRef, VFC } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import globalStyles from '~global/constants.style';
import { actions as todosActions } from '~store/todo/todo.actions';
import todosSelectors from '~store/todo/todo.selectors';
import { BlueText } from '../text';
import styles from './list-item.style';
import { Input } from '../input';

export const ListItem: VFC<Props> = ({
  id,
  text,
  complete,
  editingMode,
  onPressCheck,
  onLongPress,
}) => {
  const dispatch = useDispatch();
  const inputValue = useSelector(todosSelectors.editingInput);
  const editingTodos = useSelector(todosSelectors.editingTodos);
  const inputRef: Ref<HTMLInputElement> = useRef(null);
  const isMultipleEditing = editingTodos.length > 1;
  const isCurrentItemEditing = editingTodos.some((todo) => todo.id === id);
  const isIdShouldBeShown = complete || !editingMode || isMultipleEditing;
  const isUncompleteTodoIsEditing = editingMode && !complete && !isMultipleEditing;
  const isTodoSelectedOrCompleted =
    (complete && !isMultipleEditing) || (isCurrentItemEditing && isMultipleEditing);

  const onCheckPressHandle = () => {
    if (!editingMode && onPressCheck) {
      onPressCheck();
    }
  };

  const onSelectHandler = () => {
    if (isMultipleEditing) {
      if (isCurrentItemEditing) {
        dispatch(todosActions.todoDeselect(id));
      } else {
        dispatch(todosActions.todoSelect(id));
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [editingMode]);

  return (
    <TouchableWithoutFeedback
      onLongPress={onLongPress}
      delayLongPress={globalStyles.DEALY_PRESS}
      onPress={onSelectHandler}
    >
      <View style={[styles.wrapper, editingMode && styles.active]}>
        {isIdShouldBeShown && (
          <View style={styles.id}>
            <BlueText fs={globalStyles.MAIN_FS}>{`${id}.`}</BlueText>
          </View>
        )}
        <View style={styles.text}>
          {isUncompleteTodoIsEditing ? (
            <Input
              placeholder="Enter todo"
              value={inputValue}
              onChange={(value: string) => dispatch(todosActions.todoEditingInputChange(value))}
              ref={inputRef}
            />
          ) : (
            <BlueText fs={globalStyles.MAIN_FS} isCrossed={complete}>
              {text}
            </BlueText>
          )}
        </View>
        <View style={styles.complete}>
          {isUncompleteTodoIsEditing ? (
            <MaterialCommunityIcons
              name="pencil"
              size={globalStyles.ICON_EXSM_SIZE}
              color={globalStyles.CANCEL_COLOR}
            />
          ) : isTodoSelectedOrCompleted ? (
            <AntDesign
              name="checkcircle"
              size={globalStyles.ICON_SM_SIZE}
              color={globalStyles.SUCCESS_COLOR}
            />
          ) : (
            <MaterialCommunityIcons
              name="checkbox-blank-circle-outline"
              size={globalStyles.ICON_SM_SIZE}
              color={globalStyles.ICON_DEF_COLOR}
              onPress={isMultipleEditing ? onSelectHandler : onCheckPressHandle}
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

type Props = {
  id: number;
  text: string;
  complete: boolean;
  editingMode?: boolean;
  onPressCheck?: () => void;
  onLongPress?: () => void;
};
