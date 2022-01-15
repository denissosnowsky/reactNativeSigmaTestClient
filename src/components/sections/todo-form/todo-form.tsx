import React, { useState, VFC } from 'react';
import { Keyboard, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonIcon } from '~components/common/button-icon';
import { Input } from '~components/common/input';
import { thunks as todosThunks } from '~store/todo';
import todoSelectors from '~store/todo/todo.selectors';
import { actions as todosActions } from '~store/todo/todo.actions';
import { ModalFC } from '~components/common/modal';
import styles from './todo-form.style';

export const TodoForm: VFC = () => {
  const dispatch = useDispatch();
  const editingMode = useSelector(todoSelectors.editingMode);
  const editingTodos = useSelector(todoSelectors.editingTodos);
  const editingInput = useSelector(todoSelectors.editingInput);
  const [formValue, setFormValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const isMultipleEditing = editingTodos.length > 1;

  const clearForm = () => {
    setFormValue('');
    Keyboard.dismiss();
  };

  const addTodoHandler = () => {
    if (formValue) {
      dispatch(todosThunks.addTodo({ userId: 1, title: formValue }));
      clearForm();
    }
  };

  const deleteTodoHandler = () => {
    dispatch(todosThunks.deleteTodo(editingTodos));
    clearForm();
    setShowModal(false);
  };

  const cancelHandler = () => {
    dispatch(todosActions.todoEditModeOff());
    clearForm();
  };

  const changeTodoHandler = () => {
    dispatch(todosThunks.changeTodo(editingTodos[0]!.id, editingInput));
    clearForm();
  };

  return (
    <>
      <View style={styles.wrapepr}>
        {!editingMode ? (
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
            style={
              isMultipleEditing || editingTodos[0]?.completed
                ? styles.twoBtnEditBlock
                : styles.threeBtnEditBlock
            }
          >
            {!isMultipleEditing && !editingTodos[0]?.completed && (
              <ButtonIcon onPress={changeTodoHandler} variant="save" />
            )}
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
