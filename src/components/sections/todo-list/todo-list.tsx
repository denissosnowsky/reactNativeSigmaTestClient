import React, { useCallback, useEffect, VFC } from 'react';
import { Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ListItem } from '~components/common/list-item';
import { ImportantEnum, TodoDTO } from '~types/todo.types';
import todosSelectors from '~store/todo/todo.selectors';
import { todoThunks } from '~store/todo';
import { ListHeader } from '~components/list-header/list-header';
import { Loading } from '~components/common/loading';
import { connectComponentWithPropsCallback } from '~hoc/connectComponentWithProps';
import { TodoListNoTodos } from './components/todo-list-noTodos';
import { TodoListFooter } from './components/todo-list-footer';
import { useOnEndReached } from './hooks/useOnEndReached';
import { setIsTodoEmpty } from './utils/setIsTodoEmpty';
import { setCanLoadMorePages } from './utils/setCanLoadMorePages';
import { getKeyExtractor } from './utils/getKeyExtractor';
import styles from './todo-list.style';

export const TodoList: VFC<Props> = ({ onScroll, chosenPriority, setChosenPriority }) => {
  const dispatch = useDispatch();
  const todos = useSelector(todosSelectors.todos);
  const editingTodos = useSelector(todosSelectors.editingTodos);
  const allTodosCount = useSelector(todosSelectors.allTodosCount);
  const page = useSelector(todosSelectors.page);
  const isLoading = useSelector(todosSelectors.loading);
  const isListInitializing = useSelector(todosSelectors.isListInitializing);

  useEffect(() => {
    dispatch(todoThunks.todosFetchThunk());
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(todoThunks.todoGetCursorThunk());
  }, [dispatch]);

  const onEndReached = useOnEndReached(
    setCanLoadMorePages(allTodosCount, todos, isLoading),
    dispatch,
  );

  const renderItem = useCallback(
    ({ item }: { item: TodoDTO }) =>
      connectComponentWithPropsCallback({ ...item, chosenPriority, setChosenPriority }, ListItem),
    [chosenPriority, setChosenPriority],
  );

  const footerItem = () => connectComponentWithPropsCallback({ isLoading }, TodoListFooter);

  if (isListInitializing) {
    return <Loading />;
  }

  if (setIsTodoEmpty(todos)) {
    return <TodoListNoTodos />;
  }

  return (
    <>
      <ListHeader />
      <Animated.FlatList
        style={styles.wrapper}
        data={todos}
        renderItem={renderItem}
        keyExtractor={getKeyExtractor}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={footerItem}
        testID="list"
        onScroll={onScroll}
      />
    </>
  );
};

type Props = {
  onScroll: (...args: unknown[]) => void;
  chosenPriority: ImportantEnum | null;
  setChosenPriority: (arg: ImportantEnum | null) => void;
};
