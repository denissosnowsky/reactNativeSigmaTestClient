import React, { useCallback, useEffect, VFC } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ListItem } from '~components/common/list-item';
import { TodoDTO } from '~types/todo.types';
import todosSelectors from '~store/todo/todo.selectors';
import { BlueText } from '~components/common/text';
import { thunks as todosThunks } from '~store/todo';
import { actions as todosActions } from '~store/todo/todo.actions';
import { ListHeader } from '~components/list-header/list-header';
import globalStyle from '~global/constants.style';
import styles from './todo-list.style';

export const TodoList: VFC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(todosSelectors.todos);
  const editingTodos = useSelector(todosSelectors.editingTodos);
  const allTodosCount = useSelector(todosSelectors.allTodosCount);
  const page = useSelector(todosSelectors.page);
  const loading = useSelector(todosSelectors.loading);
  const isListInitializing = useSelector(todosSelectors.isListInitializing);
  const isTodosEmpty = todos.length === 0;

  useEffect(() => {
    dispatch(todosThunks.fetchTodos());
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(todosThunks.getCursor());
  }, [dispatch]);

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <ListItem
          id={item.id}
          text={item.title}
          complete={item.completed}
          onPressCheck={() => dispatch(todosThunks.completeTodo(item.id))}
          onLongPress={() => dispatch(todosActions.todoEditModeOn(item.id))}
          editingMode={editingTodos.some((todo) => todo.id === item.id)}
        />
      );
    },
    [dispatch, editingTodos],
  );

  const footerItem = useCallback(
    () => (
      <View style={styles.loadingWrapper}>
        {loading && <ActivityIndicator size="small" color={globalStyle.MAIN_COLOR} />}
      </View>
    ),
    [loading],
  );

  const keyExtractor = useCallback((item: TodoDTO) => String(item.id), []);

  const onEndReached = useCallback(() => {
    if (allTodosCount > todos.length && !loading) {
      dispatch(todosActions.todoNextPage());
    }
  }, [dispatch, allTodosCount, todos, loading]);

  if (isListInitializing) {
    return (
      <View style={styles.nonListWrapper}>
        <ActivityIndicator size="large" color={globalStyle.MAIN_COLOR} />
      </View>
    );
  }

  return (
    <>
      {isTodosEmpty ? (
        <View style={styles.nonListWrapper}>
          <BlueText fs={globalStyle.BIG_FT}>Add your first Todo</BlueText>
        </View>
      ) : (
        <>
          <ListHeader />
          <FlatList
            style={styles.wrapper}
            data={todos}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={footerItem}
          />
        </>
      )}
    </>
  );
};
