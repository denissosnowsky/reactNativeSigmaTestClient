import React, { useRef, useState, VFC } from 'react';
import { Animated, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonIcon } from '~components/common/button-icon';
import { Selector } from '~components/common/selector';
import globalStyles from '~global/constants.style';
import todosSelectors from '~store/todo/todo.selectors';
import { CompletenceFilter } from '~types/todo.types';
import { todoActions, todoThunks } from '~store/todo';
import { animationWithTime } from '~utils/animationWithTime';
import styles from './list-filter.style';

export const ListFilter: VFC = () => {
  const [filter, setFilter] = useState(false);
  const completenceFilterMode = useSelector(todosSelectors.completenceFilterMode);
  const dispatch = useDispatch();
  const filtersScaleAndOpacity = useRef(new Animated.Value(0)).current;
  const filtersEndScale = 1;
  const filtersHeight = useRef(new Animated.Value(0)).current;
  const filtersEndHeight = 55;

  const completenceFilterData = [
    {
      name: 'default status',
      action: () => {
        dispatch(todoActions.todoCompletenceFilterRequested(CompletenceFilter.DEFAULT));
        /* dispatch(todoThunks.todosFetchThunk()); */
      },
    },
    {
      name: 'completed',
      action: () => {
        dispatch(todoActions.todoCompletenceFilterRequested(CompletenceFilter.COMPLETED));
        /* dispatch(todoThunks.todosFetchThunk()); */
      },
    },
    {
      name: 'uncompleted',
      action: () => {
        dispatch(todoActions.todoCompletenceFilterRequested(CompletenceFilter.UNCOMPLETED));
        /* dispatch(todoThunks.todosFetchThunk()); */
      },
    },
  ];

  const iconPicker = (completenceFilterMode: CompletenceFilter) => {
    switch (completenceFilterMode) {
      case CompletenceFilter.COMPLETED:
        return 'check';
      case CompletenceFilter.UNCOMPLETED:
        return 'circle-outline';
      case CompletenceFilter.DEFAULT:
      default:
        return 'default-hide';
    }
  };

  const onFilterClickHandler = () => {
    if (!filter) {
      Animated.sequence([
        animationWithTime(filtersHeight, filtersEndHeight, 100),
        animationWithTime(filtersScaleAndOpacity, filtersEndScale, 100),
      ]).start();
      setFilter(true);
    } else {
      Animated.sequence([
        animationWithTime(filtersScaleAndOpacity, 0, 100),
        animationWithTime(filtersHeight, 0, 100),
      ]).start();
      setFilter(false);
    }
  };

  return (
    <>
      <View style={styles.filter}>
        <ButtonIcon
          variant="filter"
          size={globalStyles.ICON_SM_SIZE}
          onPress={onFilterClickHandler}
        />
      </View>
      <Animated.View
        style={[
          styles.selectorsWrapper,
          {
            transform: [{ scale: 1 }],
            opacity: filtersScaleAndOpacity,
            height: filtersHeight,
          },
        ]}
      >
        {/* <View style={styles.sortImportantWrapper} /> */}
        <View style={styles.hideCompleteWrapper}>
          <ButtonIcon
            variant={iconPicker(completenceFilterMode)}
            size={globalStyles.ICON_SM_SIZE}
          />
          <Selector style={styles.selector} data={completenceFilterData} />
        </View>
      </Animated.View>
    </>
  );
};
