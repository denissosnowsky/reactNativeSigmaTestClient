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
      delayLongPress={800}
      onPress={onSelectHandler}
    >
      <View style={[styles.wrapper, editingMode && styles.active]}>
        {(complete || !editingMode || isMultipleEditing) && (
          <View style={styles.id}>
            <BlueText fs={globalStyles.MAIN_FS}>{`${id}.`}</BlueText>
          </View>
        )}
        <View style={styles.text}>
          {editingMode && !complete && !isMultipleEditing ? (
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
          {editingMode && !complete && !isMultipleEditing ? (
            <MaterialCommunityIcons name="pencil" size={30} color={globalStyles.CANCEL_COLOR} />
          ) : (complete && !isMultipleEditing) || (isCurrentItemEditing && isMultipleEditing) ? (
            <AntDesign name="checkcircle" size={35} color={globalStyles.SUCCESS_COLOR} />
          ) : (
            <MaterialCommunityIcons
              name="checkbox-blank-circle-outline"
              size={35}
              color="#000"
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
