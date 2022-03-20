import React, { useContext, useMemo, useRef, useState, VFC } from 'react';
import { Animated, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { TodoForm } from '~components/sections/todo-form';
import { TodoList } from '~components/sections/todo-list';
import { ThemeContext } from '~contexts';
import { Theme } from '~components/containers/theme/theme';
import { ModalFC } from '~components/common/modal';
import { ImportantEnum } from '~types/todo.types';
import todoSelectors from '~store/todo/todo.selectors';
import { useAnimation } from './utils/useAnimation';
import { TodosState } from './utils/TodosState';
import { TodosHeader } from './components/todos-header';
import styles from './todos.style';

export const Todos: VFC = () => {
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);

  const [chosenPriority, setChosenPriority] = useState<ImportantEnum | null>(null);
  const editingTodos = useSelector(todoSelectors.editingTodos);
  const editingInput = useSelector(todoSelectors.editingInput);
  const isChangeModalOpened = useSelector(todoSelectors.isChangeModalOpened);
  const scrollY = useRef(new Animated.Value(0)).current;

  const ItemState = useMemo(() => {
    return new TodosState(
      scrollY,
      editingInput,
      editingTodos,
      isChangeModalOpened,
      chosenPriority,
      dispatch,
      setChosenPriority,
    );
  }, [scrollY, editingInput, editingTodos, isChangeModalOpened, chosenPriority, setChosenPriority]);

  const headerHeight = useRef(new Animated.Value(ItemState.headerInitHeight)).current;
  const headerPaddingTop = useRef(new Animated.Value(ItemState.headerInitTopPadding)).current;
  const headerScaleAndOpacity = useRef(new Animated.Value(1)).current;

  useAnimation(
    scrollY,
    ItemState.scrollAnimatedOffset,
    headerScaleAndOpacity,
    headerHeight,
    headerPaddingTop,
    ItemState.headerEndTopPadding,
    ItemState.headerInitHeight,
    ItemState.headerInitTopPadding,
  );

  return (
    <Theme scaleAndOpacity={headerScaleAndOpacity}>
      <TouchableWithoutFeedback onPress={ItemState.onPressHandle}>
        <Animated.View
          style={[
            styles.container,
            { backgroundColor: theme.background, paddingTop: headerPaddingTop },
          ]}
          testID="todosWrapper"
        >
          <TodosHeader headerScaleAndOpacity={headerScaleAndOpacity} headerHeight={headerHeight} />
          <View style={[styles.body]}>
            <TodoForm
              listScrollY={scrollY}
              scrollAnimatedOffset={ItemState.scrollAnimatedOffset}
              chosenPriority={chosenPriority}
              setChosenPriority={setChosenPriority}
            />
            <TodoList
              onScroll={ItemState.onScroll}
              chosenPriority={chosenPriority}
              setChosenPriority={setChosenPriority}
            />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
      <ModalFC
        showModal={isChangeModalOpened}
        confirm={ItemState.agreeModalChangeHandler}
        decline={ItemState.cancelModalChangeHandler}
        text={ItemState.modalText}
      />
    </Theme>
  );
};
