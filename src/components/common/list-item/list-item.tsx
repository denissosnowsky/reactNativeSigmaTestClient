import React, { Ref, useContext, useEffect, useMemo, useRef, VFC } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import globalStyles from '~global/constants.style';
import todosSelectors from '~store/todo/todo.selectors';
import { ThemeContext } from '~contexts';
import { ImportantEnum } from '~types/todo.types';
import styles from './list-item.style';
import { ListItemState } from './utils/listItemState';
import { ListItemId } from './components/list-item-id';
import { ListItemText } from './components/list-item-text';
import { ListItemStatus } from './components/list-item-status';

export const ListItem: VFC<Props> = ({
  id,
  title,
  completed,
  important,
  chosenPriority,
  setChosenPriority,
}) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const inputRef: Ref<HTMLInputElement> = useRef(null);
  const inputValue = useSelector(todosSelectors.editingInput);
  const isEdiditngMode = useSelector(todosSelectors.editingMode);
  const editingTodos = useSelector(todosSelectors.editingTodos);

  const ItemState = useMemo(() => {
    return new ListItemState(
      completed,
      chosenPriority,
      inputValue,
      isEdiditngMode,
      editingTodos,
      id,
      dispatch,
      setChosenPriority,
    );
  }, [completed, chosenPriority, inputValue, isEdiditngMode, editingTodos, id]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [ItemState.isCurrentItemEditing]);

  return (
    <TouchableWithoutFeedback
      onLongPress={ItemState.onLongPressTodoHandle}
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
      >
        <ListItemId id={id} priorityType={important} isShown={ItemState.isIdShouldBeShown} />
        <ListItemText
          text={title}
          ref={inputRef}
          onChange={(value: string) => ItemState.onInputChangeHandler(value)}
          inputValue={inputValue}
          isCompleted={completed}
          isEditing={ItemState.isUncompletedAndSoleEditingMode}
        />
        <ListItemStatus
          isTodoSolelyEditing={ItemState.isUncompletedAndSoleEditingMode}
          isTodoSelectedOrCompleted={ItemState.isTodoSelectedOrCompleted}
          isMultipleEditingMode={ItemState.isMultipleEditingMode}
          onSelectTodoHandler={ItemState.onSelectTodoHandler}
          onCheckPressTodoHandle={ItemState.onCheckPressTodoHandle}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

type Props = {
  id: number;
  title: string;
  completed: boolean;
  important: ImportantEnum;
  chosenPriority: ImportantEnum | null;
  setChosenPriority: (arg: ImportantEnum | null) => void;
};
