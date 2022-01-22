import React, { useState, VFC } from 'react';
import { Keyboard, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonIcon } from '~components/common/button-icon';
import { Input } from '~components/common/input';
import { todoThunks, todoActions } from '~store/todo';
import todoSelectors from '~store/todo/todo.selectors';
import { ModalFC } from '~components/common/modal';
import styles from './todo-form.style';

export const TodoForm: VFC = () => {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const isEditingMode = useSelector(todoSelectors.editingMode);
  const editingTodos = useSelector(todoSelectors.editingTodos);
  const editingInput = useSelector(todoSelectors.editingInput);
  const isMultipleEditing = editingTodos.length > 1;
  const isSaveButtonShouldBeShown = !isMultipleEditing && !editingTodos[0]?.completed;

  const clearFormHandler = () => {
    setFormValue('');
    Keyboard.dismiss();
  };

  const addTodoHandler = () => {
    if (formValue) {
      dispatch(todoThunks.todoAddThunk({ userId: 1, title: formValue }));
      clearFormHandler();
    }
  };

  const deleteTodoHandler = () => {
    dispatch(todoThunks.todoDeleteThunk(editingTodos));
    clearFormHandler();
    setShowModal(false);
  };

  const cancelHandler = () => {
    dispatch(todoActions.todoEditModeOff());
    clearFormHandler();
  };

  const changeTodoHandler = () => {
    dispatch(todoThunks.todoChangeThunk(editingTodos[0]!.id, editingInput));
    clearFormHandler();
  };

  return (
    <>
      <View style={styles.wrapepr}>
        {!isEditingMode ? (
          <>
            <Input
              placeholder="Add new todo"
              onChange={setFormValue}
              value={formValue}
              underlined
            />
            <ButtonIcon onPress={addTodoHandler} variant="add" />
          </>
        ) : (
          <View
            style={isSaveButtonShouldBeShown ? styles.threeBtnEditBlock : styles.twoBtnEditBlock}
          >
            {isSaveButtonShouldBeShown && <ButtonIcon onPress={changeTodoHandler} variant="save" />}
            <ButtonIcon onPress={() => setShowModal(true)} variant="delete" />
            <ButtonIcon onPress={cancelHandler} variant="cancel" />
          </View>
        )}
      </View>
      <ModalFC
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        itemsQuantity={editingTodos.length}
        confirm={deleteTodoHandler}
        decline={() => {
          cancelHandler();
          setShowModal(false);
        }}
      />
    </>
  );
};
