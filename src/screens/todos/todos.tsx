import React, { VFC } from 'react';
import { useSelector } from 'react-redux';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { Header } from '~components/header';
import { TodoForm } from '~components/sections/todo-form';
import { TodoList } from '~components/sections/todo-list';
import todoSelectors from '~store/todo/todo.selectors';
import { Alert } from '~components/common/alert';
import styles from './todos.style';

export const Todos: VFC = () => {
  const error = useSelector(todoSelectors.error);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.boardAvoidBlock}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Alert text="Some error happened" status="error" isShown={Boolean(error)} />
          <Header />
          <View style={styles.body}>
            <TodoForm />
            <TodoList />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
