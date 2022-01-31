import React, { VFC } from 'react';
import { Keyboard, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonIcon } from '~components/common/button-icon';
import { Input } from '~components/common/input';
import { todoThunks, todoActions } from '~store/todo';
import todoSelectors from '~store/todo/todo.selectors';
import { dispatchSelection } from '~utils/dispatchSelection';
import { ModalFC } from '~components/common/modal';
import styles from './todo-form.style';
import { clearFormHandler } from './utils/clearFormHandler';
import { addTodoHandler } from './utils/addTodoHandler';
import { changeTodoHandler } from './utils/changeTodoHandler';
import { cancelHandler } from './utils/cancelHandler';
import { deleteTodoHandler } from './utils/deleteTodoHandler';
import { selectAllTodosHandler } from './utils/selectAllTodosHandler';

export const TodoForm: VFC = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const [formValue, setFormValue] = React.useState('');
  const isEditingMode = useSelector(todoSelectors.editingMode);
  const editingTodos = useSelector(todoSelectors.editingTodos);
  const editingInput = useSelector(todoSelectors.editingInput);
  const isMultipleEditing = editingTodos.length > 1 && isEditingMode;
  const isSaveButtonShouldBeShown =
    !isMultipleEditing && !editingTodos[0]?.completed && isEditingMode;

  const addHandler = () =>
    addTodoHandler(
      formValue,
      dispatchSelection(dispatch, todoThunks.todoAddThunk({ userId: 1, title: formValue })),
      clearFormHandler(setFormValue, Keyboard),
    );

  const changeHandler = () =>
    changeTodoHandler(
      dispatchSelection(dispatch, todoThunks.todoChangeThunk(editingTodos[0]!.id, editingInput)),
      clearFormHandler(setFormValue, Keyboard),
    );

  const cancelAllHandler = () =>
    cancelHandler(
      dispatchSelection(dispatch, todoActions.todoEditModeOff()),
      clearFormHandler(setFormValue, Keyboard),
      setShowModal,
    );

  const deleteHandler = () =>
    deleteTodoHandler(
      dispatchSelection(dispatch, todoThunks.todoDeleteThunk(editingTodos)),
      clearFormHandler(setFormValue, Keyboard),
      setShowModal,
    );

  const selectAllHandler = () =>
    selectAllTodosHandler(dispatchSelection(dispatch, todoActions.todoSelectAll()));

  return (
    <>
      <View style={styles.wrapepr}>
        {!isEditingMode ? (
          <View style={styles.formWrapper}>
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
            style={
              isSaveButtonShouldBeShown || isMultipleEditing
                ? styles.threeBtnEditBlock
                : styles.twoBtnEditBlock
            }
            testID="btnWrapper"
          >
            {isSaveButtonShouldBeShown && <ButtonIcon onPress={changeHandler} variant="save" />}
            {isMultipleEditing && <ButtonIcon onPress={selectAllHandler} variant="select-all" />}
            <ButtonIcon onPress={() => setShowModal(true)} variant="delete" />
            <ButtonIcon onPress={cancelAllHandler} variant="cancel" />
          </View>
        )}
      </View>
      <ModalFC
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        itemsQuantity={editingTodos.length}
        confirm={deleteHandler}
        decline={cancelAllHandler}
      />
    </>
  );
};
