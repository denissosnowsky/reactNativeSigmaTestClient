import React, { useContext, VFC } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import { Header } from '~components/header';
import { TodoForm } from '~components/sections/todo-form';
import { TodoList } from '~components/sections/todo-list';
import { ThemeContext } from '~contexts';
import { Theme } from '~components/containers/theme/theme';
import styles from './todos.style';

export const Todos: VFC = () => {
  const theme = useContext(ThemeContext);

  return (
    <Theme>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[styles.container, { backgroundColor: theme.background }]}
          testID="todosWrapper"
        >
          <Header />
          <View style={[styles.body]}>
            <TodoForm />
            <TodoList />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Theme>
  );
};
