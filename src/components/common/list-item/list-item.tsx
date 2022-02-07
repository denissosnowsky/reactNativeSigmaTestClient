import React, { Ref, useContext, useEffect, useMemo, useRef, VFC } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import globalStyles from '~global/constants.style';
import { todoActions } from '~store/todo';
import todosSelectors from '~store/todo/todo.selectors';
import { ThemeContext } from '~contexts';
import { ImportantEnum } from '~types/todo.types';
import { BlueText } from '../text';
import styles from './list-item.style';
import { Input } from '../input';
import { onCheckPressHandle } from './utils/onCheckPressHandle';
import { LinearSVG } from '../svg/linear-svg';
import { getPriorityColor } from './utils/getPriorityColor';
import { ListItemState } from './utils/listItemState';

export const ListItem: VFC<Props> = ({
  id,
  text,
  isCompleted,
  priorityType,
  chosenPriority,
  setChosenPriority,
  onPressCheck,
  onLongPress,
}) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const todoWrapper: React.LegacyRef<View> = useRef(null);
  const inputRef: Ref<HTMLInputElement> = useRef(null);
  const inputValue = useSelector(todosSelectors.editingInput);
  const isEdiditngMode = useSelector(todosSelectors.editingMode);
  const editingTodos = useSelector(todosSelectors.editingTodos);
  const ItemState = useMemo(() => {
    return new ListItemState(
      isCompleted,
      chosenPriority,
      inputValue,
      isEdiditngMode,
      editingTodos,
      id,
      dispatch,
      setChosenPriority,
    );
  }, [isCompleted, chosenPriority, inputValue, isEdiditngMode, editingTodos, id]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [ItemState.isCurrentItemEditing]);

  return (
    <TouchableWithoutFeedback
      onLongPress={onLongPress}
      delayLongPress={globalStyles.DEALY_PRESS}
      onPress={ItemState.onSelectTodoHandler}
      testID="list-item-wrapper"
    >
      <View
        style={[
          styles.wrapper,
          ItemState.isCurrentItemEditing && styles.active,
          { backgroundColor: theme.listItemBG },
        ]}
        ref={todoWrapper}
      >
        {ItemState.isIdShouldBeShown && (
          <View style={styles.id}>
            <View style={styles.idTextWrapper}>
              <View style={styles.idText}>
                <BlueText fs={globalStyles.MAIN_FS}>{`${id}.`}</BlueText>
              </View>
              <LinearSVG
                height="100%"
                color1={priorityType ? getPriorityColor(priorityType) : theme.listItemBG}
                color2={theme.listItemBG}
              />
            </View>
          </View>
        )}
        <View style={styles.text}>
          {ItemState.isUncompletedAndSoleEditingMode ? (
            <Input
              placeholder="Enter todo"
              value={inputValue}
              onChange={(value: string) => dispatch(todoActions.todoEditingInputChange(value))}
              ref={inputRef}
            />
          ) : (
            <BlueText fs={globalStyles.MAIN_FS} isCrossed={isCompleted}>
              {text}
            </BlueText>
          )}
        </View>
        <View style={styles.complete}>
          {ItemState.isUncompletedAndSoleEditingMode ? (
            <MaterialCommunityIcons
              testID="pencil"
              name="pencil"
              size={globalStyles.ICON_EXSM_SIZE}
              color={globalStyles.LIGHT_CANCEL_COLOR}
            />
          ) : ItemState.isTodoSelectedOrCompleted ? (
            <AntDesign
              name="checkcircle"
              size={globalStyles.ICON_SM_SIZE}
              color={globalStyles.SUCCESS_COLOR}
              testID="check"
              onPress={
                ItemState.isMultipleEditingMode
                  ? ItemState.onSelectTodoHandler
                  : () => onCheckPressHandle(onPressCheck)
              }
            />
          ) : (
            <MaterialCommunityIcons
              name="checkbox-blank-circle-outline"
              testID="circle-blank"
              size={globalStyles.ICON_SM_SIZE}
              color={globalStyles.ICON_DEF_COLOR}
              onPress={
                ItemState.isMultipleEditingMode
                  ? ItemState.onSelectTodoHandler
                  : () => onCheckPressHandle(onPressCheck)
              }
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
  isCompleted: boolean;
  priorityType: ImportantEnum;
  chosenPriority: ImportantEnum | null;
  onLongPress: () => void;
  onPressCheck: () => void;
  setChosenPriority: (arg: ImportantEnum | null) => void;
};
