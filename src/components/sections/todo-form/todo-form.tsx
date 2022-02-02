import React, { useContext, useEffect, useRef, useState, VFC } from 'react';
import { Animated, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonIcon } from '~components/common/button-icon';
import { Input } from '~components/common/input';
import { todoThunks, todoActions } from '~store/todo';
import todoSelectors from '~store/todo/todo.selectors';
import { dispatchSelection } from '~utils/dispatchSelection';
import { ModalFC } from '~components/common/modal';
import { TitleLetterSVG } from '~components/common/svg';
import { useChangeColor } from '~hooks/useChangeColor';
import { animationWithTime } from '~utils/animationWithTime';
import { iconPickerImportantFilter } from '~utils/iconPickerImportantFilter';
import { ListFilter } from '~components/list-filter';
import { IconsNames, ImportantEnum } from '~types/todo.types';
import { ThemeContext } from '~contexts';
import styles from './todo-form.style';
import { clearFormHandler } from './utils/clearFormHandler';
import { addTodoHandler } from './utils/addTodoHandler';
import { changeTodoHandler } from './utils/changeTodoHandler';
import { cancelHandler } from './utils/cancelHandler';
import { deleteTodoHandler } from './utils/deleteTodoHandler';
import { selectAllTodosHandler } from './utils/selectAllTodosHandler';
import { getPriorityButtons } from './utils/getPriorityButtons';

export const TodoForm: VFC<Props> = ({ listScrollY, scrollAnimatedOffset }) => {
  const theme = useContext(ThemeContext);
  const [priorityDropdown, setPriorityDropdown] = useState(false);
  const [temporaryNewPriority, setTemporaryNewPriority] = useState('');
  const [color, setColor] = useChangeColor();
  const dispatch = useDispatch();
  const [formValue, setFormValue] = React.useState('');
  const isEditingMode = useSelector(todoSelectors.editingMode);
  const editingTodos = useSelector(todoSelectors.editingTodos);
  const editingInput = useSelector(todoSelectors.editingInput);
  const isDeleteModalOpened = useSelector(todoSelectors.isDeleteModalOpened);
  const isMultipleEditing = editingTodos.length > 1 && isEditingMode;
  const isSaveButtonShouldBeShown =
    !isMultipleEditing && !editingTodos[0]?.completed && isEditingMode;
  const logoLetterWidth = 35;
  const letterScaleAndOpacity = useRef(new Animated.Value(0)).current;
  const letterWidth = useRef(new Animated.Value(0)).current;
  const todoPriority = editingTodos[0]?.important;
  const [chosenPriority, setChosenPriority] = useState<ImportantEnum>(todoPriority);

  useEffect(() => {
    const id = listScrollY.addListener((v) => {
      let isAnimationStartScrollActivated = false;
      let isAnimationEndScrollActivated = false;

      if (v.value > scrollAnimatedOffset && !isAnimationStartScrollActivated) {
        Animated.parallel([
          animationWithTime(letterScaleAndOpacity, 1, 150),
          animationWithTime(letterWidth, logoLetterWidth, 150),
        ]).start();

        isAnimationStartScrollActivated = true;
        isAnimationEndScrollActivated = false;
      }

      if (v.value < scrollAnimatedOffset && !isAnimationEndScrollActivated) {
        Animated.parallel([
          animationWithTime(letterScaleAndOpacity, 0, 100),
          animationWithTime(letterWidth, 0, 100),
        ]).start();

        isAnimationEndScrollActivated = true;
        isAnimationStartScrollActivated = false;
      }
    });
    return () => listScrollY.removeListener(id);
  }, [listScrollY]);

  const addHandler = () =>
    addTodoHandler(
      formValue,
      dispatchSelection(dispatch, todoThunks.todoAddThunk({ userId: 1, title: formValue })),
      clearFormHandler(
        setFormValue,
        Keyboard,
        setTemporaryNewPriority,
        setChosenPriority,
        todoPriority,
      ),
    );

  const changeHandler = () =>
    changeTodoHandler(
      dispatchSelection(
        dispatch,
        todoThunks.todoChangeThunk(editingTodos[0]!.id, editingInput, chosenPriority),
      ),
      clearFormHandler(
        setFormValue,
        Keyboard,
        setTemporaryNewPriority,
        setChosenPriority,
        chosenPriority,
      ),
    );

  const cancelAllHandler = () =>
    cancelHandler(
      dispatchSelection(dispatch, todoActions.todoEditModeOff()),
      clearFormHandler(
        setFormValue,
        Keyboard,
        setTemporaryNewPriority,
        setChosenPriority,
        todoPriority,
      ),
      dispatchSelection(dispatch, todoActions.todoEditDeleteModalModeOn(false)),
    );

  const deleteHandler = () =>
    deleteTodoHandler(
      dispatchSelection(dispatch, todoThunks.todoDeleteThunk(editingTodos)),
      clearFormHandler(
        setFormValue,
        Keyboard,
        setTemporaryNewPriority,
        setChosenPriority,
        todoPriority,
      ),
      dispatchSelection(dispatch, todoActions.todoEditDeleteModalModeOn(false)),
    );

  const selectAllHandler = () =>
    selectAllTodosHandler(dispatchSelection(dispatch, todoActions.todoSelectAll()));

  const currentTodoPriority = iconPickerImportantFilter(todoPriority);

  const allPriorityButtons: Array<{ name: IconsNames; action: () => void }> = getPriorityButtons(
    setPriorityDropdown,
    setTemporaryNewPriority,
    setChosenPriority,
  );

  const nonChosenPriorityButtons = allPriorityButtons.filter(
    (btn) => btn.name !== (temporaryNewPriority ? temporaryNewPriority : currentTodoPriority),
  );

  return (
    <>
      <View style={styles.wrapepr}>
        {!isEditingMode ? (
          <View style={styles.formWrapper}>
            <TouchableWithoutFeedback onPress={setColor} accessibilityRole="button">
              <Animated.View
                style={[
                  styles.letterWrapper,
                  {
                    transform: [{ scale: letterScaleAndOpacity }],
                    width: letterWidth,
                    opacity: letterScaleAndOpacity,
                  },
                ]}
              >
                <TitleLetterSVG color={color} />
              </Animated.View>
            </TouchableWithoutFeedback>
            <Input
              placeholder="Add new todo"
              onChange={setFormValue}
              value={formValue}
              underlined
              style={styles.input}
            />
            <ButtonIcon onPress={addHandler} variant="add" />
          </View>
        ) : (
          <View
            style={[
              isSaveButtonShouldBeShown || isMultipleEditing
                ? styles.fourBtnEditBlock
                : styles.twoBtnEditBlock,
            ]}
            testID="btnWrapper"
          >
            {isSaveButtonShouldBeShown && (
              <View style={styles.priorityWrapper}>
                <ButtonIcon
                  onPress={() => setPriorityDropdown(!priorityDropdown)}
                  variant={
                    temporaryNewPriority
                      ? (temporaryNewPriority as IconsNames)
                      : currentTodoPriority
                  }
                />
                {priorityDropdown && (
                  <View style={[styles.priorityDropdown, { backgroundColor: theme.listItemBG }]}>
                    {nonChosenPriorityButtons.map((btn, i) => (
                      <ButtonIcon variant={btn.name} onPress={btn.action} key={i} />
                    ))}
                  </View>
                )}
              </View>
            )}
            {isSaveButtonShouldBeShown && <ButtonIcon onPress={changeHandler} variant="save" />}
            {isMultipleEditing && <ButtonIcon onPress={selectAllHandler} variant="select-all" />}
            <ButtonIcon
              onPress={dispatchSelection(dispatch, todoActions.todoEditDeleteModalModeOn(true))}
              variant="delete"
            />
            <ButtonIcon onPress={cancelAllHandler} variant="cancel" />
          </View>
        )}
      </View>
      <ModalFC
        showModal={isDeleteModalOpened}
        confirm={deleteHandler}
        decline={cancelAllHandler}
        text={`Delete ${editingTodos.length} ${isMultipleEditing ? 'todos' : 'todo'}?`}
      />
      <ListFilter />
    </>
  );
};

type Props = {
  listScrollY: Animated.Value;
  scrollAnimatedOffset: number;
};
