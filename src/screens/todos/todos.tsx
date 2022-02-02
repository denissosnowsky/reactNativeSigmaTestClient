import React, { useContext, useEffect, useRef, VFC } from 'react';
import { Animated, Easing, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Header } from '~components/header';
import { TodoForm } from '~components/sections/todo-form';
import { TodoList } from '~components/sections/todo-list';
import { ThemeContext } from '~contexts';
import { Theme } from '~components/containers/theme/theme';
import { dispatchSelection } from '~utils/dispatchSelection';
import { todoThunks, todoActions } from '~store/todo';
import { ModalFC } from '~components/common/modal';
import todoSelectors from '~store/todo/todo.selectors';
import { animationWithTime } from '~utils/animationWithTime';
import styles from './todos.style';
import { cancelHandler } from './utils/cancelHandler';
import { changeTodoHandler } from './utils/changeTodoHandler';

export const Todos: VFC = () => {
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerInitHeight = 90;
  const headerScaleAndOpacity = useRef(new Animated.Value(1)).current;
  const headerHeight = useRef(new Animated.Value(headerInitHeight)).current;
  const editingTodos = useSelector(todoSelectors.editingTodos);
  const editingInput = useSelector(todoSelectors.editingInput);
  const isChangeModalOpened = useSelector(todoSelectors.isChangeModalOpened);
  const scrollAnimatedOffset = 20;
  const isOneNonCompleteEditing = editingTodos.length === 1 && editingTodos[0].completed === false;
  const oneNonCompleteEditingId = isOneNonCompleteEditing ? editingTodos[0].id : null;
  const inputTextWasChanged = isOneNonCompleteEditing && editingInput !== editingTodos[0].title;

  const onPressHandle = () => {
    Keyboard.dismiss();
    if (isOneNonCompleteEditing && inputTextWasChanged) {
      dispatchSelection(dispatch, todoActions.todoEditChangeModalModeOn(true))();
    } else {
      dispatchSelection(dispatch, todoActions.todoEditModeOff())();
    }
  };

  const agreeModalChangeHandler = () =>
    changeTodoHandler(
      dispatchSelection(
        dispatch,
        todoThunks.todoChangeThunk(oneNonCompleteEditingId!, editingInput),
      ),
      dispatchSelection(dispatch, todoActions.todoEditChangeModalModeOn(false)),
    );

  const cancelModalChangeHandler = () =>
    cancelHandler(
      dispatchSelection(dispatch, todoActions.todoEditModeOff()),
      dispatchSelection(dispatch, todoActions.todoEditChangeModalModeOn(false)),
    );

  const onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: scrollY,
          },
        },
      },
    ],
    { useNativeDriver: false },
  );

  useEffect(() => {
    const id = scrollY.addListener((v) => {
      let isAnimationStartScrollActivated = false;
      let isAnimationEndScrollActivated = false;

      if (v.value > scrollAnimatedOffset && !isAnimationStartScrollActivated) {
        Animated.parallel([
          animationWithTime(headerScaleAndOpacity, 0, 150),
          animationWithTime(headerHeight, 0, 150),
        ]).start();

        isAnimationStartScrollActivated = true;
        isAnimationEndScrollActivated = false;
      }

      if (v.value < scrollAnimatedOffset && !isAnimationEndScrollActivated) {
        Animated.parallel([
          animationWithTime(headerScaleAndOpacity, 1, 100),
          animationWithTime(headerHeight, headerInitHeight, 100),
        ]).start();

        isAnimationEndScrollActivated = true;
        isAnimationStartScrollActivated = false;
      }
    });
    return () => scrollY.removeListener(id);
  }, [scrollY]);

  return (
    <Theme>
      <TouchableWithoutFeedback onPress={onPressHandle}>
        <View
          style={[styles.container, { backgroundColor: theme.background }]}
          testID="todosWrapper"
        >
          <Animated.View
            style={{
              transform: [{ scale: headerScaleAndOpacity }],
              height: headerHeight,
              opacity: headerScaleAndOpacity,
            }}
          >
            <Header />
          </Animated.View>
          <View style={[styles.body]}>
            <TodoForm listScrollY={scrollY} scrollAnimatedOffset={scrollAnimatedOffset} />
            <TodoList onScroll={onScroll} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ModalFC
        showModal={isChangeModalOpened}
        confirm={agreeModalChangeHandler}
        decline={cancelModalChangeHandler}
        text="Save changes?"
      />
    </Theme>
  );
};
