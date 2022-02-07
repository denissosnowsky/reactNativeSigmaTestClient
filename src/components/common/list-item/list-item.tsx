import React, { Ref, useContext, useEffect, useRef, VFC } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import globalStyles from '~global/constants.style';
import { todoActions } from '~store/todo';
import todosSelectors from '~store/todo/todo.selectors';
import { ThemeContext } from '~contexts';
import { ImportantEnum } from '~types/todo.types';
import { dispatchSelection } from '~utils/dispatchSelection';
import { BlueText } from '../text';
import styles from './list-item.style';
import { Input } from '../input';
import { onCheckPressHandle } from './utils/onCheckPressHandle';
import { onSelectHandler } from './utils/onSelectHandler';
import { onCancelEditingHandle } from './utils/onCancelEditingHandle';
import { LinearSVG } from '../svg/linear-svg';
import { getPriorityColor } from './utils/getPriorityColor';

export const ListItem: VFC<Props> = ({
  id,
  text,
  complete,
  editingMode,
  importance,
  chosenPriority,
  setChosenPriority,
  onPressCheck,
  onLongPress,
}) => {
  const dispatch = useDispatch();
  const inputValue = useSelector(todosSelectors.editingInput);
  const isEdiditngMode = useSelector(todosSelectors.editingMode);
  const editingTodos = useSelector(todosSelectors.editingTodos);
  const inputRef: Ref<HTMLInputElement> = useRef(null);
  const isMultipleEditing = editingTodos.length > 1 && isEdiditngMode;
  const isCurrentItemEditing = editingTodos.some((todo) => todo.id === id);
  const isIdShouldBeShown = complete || !editingMode || isMultipleEditing;
  const isUncompleteTodoIsEditing = editingMode && !complete && !isMultipleEditing;
  const isTodoSelectedOrCompleted =
    (complete && !isMultipleEditing) || (isCurrentItemEditing && isMultipleEditing);
  const isOneNonCompleteEditing = editingTodos.length === 1 && editingTodos[0].completed === false;
  const todoPriority = editingTodos[0]?.important;
  const todoWasChanged =
    isOneNonCompleteEditing &&
    (inputValue !== editingTodos[0].title ||
      (chosenPriority !== null ? chosenPriority !== todoPriority : false));
  const theme = useContext(ThemeContext);
  const todoWrapper: React.LegacyRef<View> = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [editingMode]);

  const onEditingOffHandler = () => {
    onCancelEditingHandle(
      isOneNonCompleteEditing,
      todoWasChanged,
      dispatchSelection(dispatch, todoActions.todoEditChangeModalModeOn(true)),
      dispatchSelection(dispatch, todoActions.todoEditModeOff()),
      setChosenPriority,
      null,
    );
  };

  return (
    <TouchableWithoutFeedback
      onLongPress={onLongPress}
      delayLongPress={globalStyles.DEALY_PRESS}
      onPress={() =>
        onSelectHandler(
          isMultipleEditing,
          isCurrentItemEditing,
          dispatchSelection(dispatch, todoActions.todoDeselectOn(id)),
          dispatchSelection(dispatch, todoActions.todoSelectOn(id)),
          onEditingOffHandler,
        )
      }
      testID="list-item-wrapper"
    >
      <View
        style={[
          styles.wrapper,
          editingMode && styles.active,
          { backgroundColor: theme.listItemBG },
        ]}
        ref={todoWrapper}
      >
        {isIdShouldBeShown && (
          <View style={styles.id}>
            <View style={styles.idTextWrapper}>
              <View style={styles.idText}>
                <BlueText fs={globalStyles.MAIN_FS}>{`${id}.`}</BlueText>
              </View>
              <LinearSVG
                height="100%"
                color1={importance ? getPriorityColor(importance) : theme.listItemBG}
                color2={theme.listItemBG}
              />
            </View>
          </View>
        )}
        <View style={styles.text}>
          {isUncompleteTodoIsEditing ? (
            <Input
              placeholder="Enter todo"
              value={inputValue}
              onChange={(value: string) => dispatch(todoActions.todoEditingInputChange(value))}
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
              testID="pencil"
              name="pencil"
              size={globalStyles.ICON_EXSM_SIZE}
              color={globalStyles.LIGHT_CANCEL_COLOR}
            />
          ) : isTodoSelectedOrCompleted ? (
            <AntDesign
              name="checkcircle"
              size={globalStyles.ICON_SM_SIZE}
              color={globalStyles.SUCCESS_COLOR}
              testID="check"
              onPress={
                isMultipleEditing
                  ? () =>
                      onSelectHandler(
                        isMultipleEditing,
                        isCurrentItemEditing,
                        dispatchSelection(dispatch, todoActions.todoDeselectOn(id)),
                        dispatchSelection(dispatch, todoActions.todoSelectOn(id)),
                        onEditingOffHandler,
                      )
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
                isMultipleEditing
                  ? () =>
                      onSelectHandler(
                        isMultipleEditing,
                        isCurrentItemEditing,
                        dispatchSelection(dispatch, todoActions.todoDeselectOn(id)),
                        dispatchSelection(dispatch, todoActions.todoSelectOn(id)),
                        onEditingOffHandler,
                      )
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
  complete: boolean;
  importance: ImportantEnum;
  editingMode?: boolean;
  chosenPriority: ImportantEnum | null;
  setChosenPriority: (arg: ImportantEnum | null) => void;
  onPressCheck: () => void;
  onLongPress: () => void;
};
