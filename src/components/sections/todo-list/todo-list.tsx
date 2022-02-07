import React, { useCallback, useEffect, VFC } from 'react';
import { ActivityIndicator, Animated, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ListItem } from '~components/common/list-item';
import { ImportantEnum, TodoDTO } from '~types/todo.types';
import todosSelectors from '~store/todo/todo.selectors';
import { BlueText } from '~components/common/text';
import { todoThunks, todoActions } from '~store/todo';
import { dispatchSelection } from '~utils/dispatchSelection';
import { ListHeader } from '~components/list-header/list-header';
import globalStyle from '~global/constants.style';
import styles from './todo-list.style';
import { fetchNextPage } from './utils/fetchNextPage';
import { compareIds } from './utils/compareIds';

export const TodoList: VFC<Props> = ({ onScroll, chosenPriority, setChosenPriority }) => {
  const dispatch = useDispatch();
  const todos = useSelector(todosSelectors.todos);
  const editingTodos = useSelector(todosSelectors.editingTodos);
  const allTodosCount = useSelector(todosSelectors.allTodosCount);
  const editingMode = useSelector(todosSelectors.editingMode);
  const page = useSelector(todosSelectors.page);
  const loading = useSelector(todosSelectors.loading);
  const isListInitializing = useSelector(todosSelectors.isListInitializing);
  const isTodosEmpty = todos.length === 0;
  const isCanLoadMorePages = allTodosCount > todos.length && !loading;

  useEffect(() => {
    dispatch(todoThunks.todosFetchThunk());
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(todoThunks.todoGetCursorThunk());
  }, [dispatch]);

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <ListItem
          id={item.id}
          text={item.title}
          isCompleted={item.completed}
          priorityType={item.important}
          chosenPriority={chosenPriority}
          setChosenPriority={setChosenPriority}
        />
      );
    },
    [dispatch, editingTodos, editingMode, chosenPriority, setChosenPriority],
  );

  const footerItem = useCallback(
    () => (
      <View style={styles.loadingWrapper}>
        {loading && (
          <ActivityIndicator size="small" color={globalStyle.LIGHT_MAIN_COLOR} testID="loading" />
        )}
      </View>
    ),
    [loading],
  );

  const keyExtractor = useCallback((item: TodoDTO) => String(item.id), []);

  const onEndReached = useCallback(
    fetchNextPage(
      isCanLoadMorePages,
      dispatchSelection(dispatch, todoActions.todoNextPageRequested()),
    ),
    [dispatch, isCanLoadMorePages],
  );

  if (isListInitializing) {
    return (
      <View style={styles.nonListWrapper} testID="init">
        <ActivityIndicator
          size="large"
          color={globalStyle.LIGHT_MAIN_COLOR}
          testID="todo-loading"
        />
      </View>
    );
  }

  return (
    <>
      {isTodosEmpty ? (
        <View style={styles.nonListWrapper}>
          <BlueText fs={globalStyle.BIG_FS}>No todos found</BlueText>
        </View>
      ) : (
        <>
          <ListHeader />
          <Animated.FlatList
            style={styles.wrapper}
            data={todos}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={footerItem}
            testID="list"
            onScroll={onScroll}
          />
        </>
      )}
    </>
  );
};

type Props = {
  onScroll: (...args: unknown[]) => void;
  chosenPriority: ImportantEnum | null;
  setChosenPriority: (arg: ImportantEnum | null) => void;
};
