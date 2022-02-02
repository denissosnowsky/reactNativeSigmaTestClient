import React, { useRef, useState, VFC } from 'react';
import { Animated, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonIcon } from '~components/common/button-icon';
import { Selector } from '~components/common/selector';
import globalStyles from '~global/constants.style';
import todosSelectors from '~store/todo/todo.selectors';
import { iconPickerImportantFilter } from '~utils/iconPickerImportantFilter';
import { CompletenceFilter, ImportantEnum } from '~types/todo.types';
import { iconPickerCompleteFilter } from '~utils/iconPickerCompleteFilter';
import { todoActions, todoThunks } from '~store/todo';
import { animationWithTime } from '~utils/animationWithTime';
import styles from './list-filter.style';

export const ListFilter: VFC = () => {
  const [filter, setFilter] = useState(false);
  const completenceFilterMode = useSelector(todosSelectors.completenceFilterMode);
  const importantFilterMode = useSelector(todosSelectors.importantFilterMode);
  const page = useSelector(todosSelectors.page);
  const dispatch = useDispatch();
  const filtersScaleAndOpacity = useRef(new Animated.Value(0)).current;
  const filtersEndScale = 1;
  const filtersHeight = useRef(new Animated.Value(0)).current;
  const filtersEndHeight = 110;
  const isFirstPage = page === 1;

  const completenceFilterData = [
    {
      name: 'default status',
      action: () => {
        dispatch(todoActions.todoCompletenceFilterRequested(CompletenceFilter.DEFAULT));
        if (isFirstPage) {
          dispatch(todoThunks.todosFetchThunk());
        }
      },
    },
    {
      name: 'completed',
      action: () => {
        dispatch(todoActions.todoCompletenceFilterRequested(CompletenceFilter.COMPLETED));
        if (isFirstPage) {
          dispatch(todoThunks.todosFetchThunk());
        }
      },
    },
    {
      name: 'uncompleted',
      action: () => {
        dispatch(todoActions.todoCompletenceFilterRequested(CompletenceFilter.UNCOMPLETED));
        if (isFirstPage) {
          dispatch(todoThunks.todosFetchThunk());
        }
      },
    },
  ];

  const importanceFilterData = [
    {
      name: 'default priority',
      action: () => {
        dispatch(todoActions.todoImportanceFilterRequested(ImportantEnum.DEFAULT));
        if (isFirstPage) {
          dispatch(todoThunks.todosFetchThunk());
        }
      },
    },
    {
      name: 'high priority',
      action: () => {
        dispatch(todoActions.todoImportanceFilterRequested(ImportantEnum.HIGH));
        if (isFirstPage) {
          dispatch(todoThunks.todosFetchThunk());
        }
      },
    },
    {
      name: 'normal priority',
      action: () => {
        dispatch(todoActions.todoImportanceFilterRequested(ImportantEnum.NORMAL));
        if (isFirstPage) {
          dispatch(todoThunks.todosFetchThunk());
        }
      },
    },
    {
      name: 'low priority',
      action: () => {
        dispatch(todoActions.todoImportanceFilterRequested(ImportantEnum.LOW));
        if (isFirstPage) {
          dispatch(todoThunks.todosFetchThunk());
        }
      },
    },
  ];

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
          variant={filter ? 'filter-opened' : 'filter-closed'}
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
        <View style={styles.filterWrapper}>
          <ButtonIcon
            variant={iconPickerCompleteFilter(completenceFilterMode)}
            size={globalStyles.ICON_SM_SIZE}
          />
          <Selector style={styles.selector} data={completenceFilterData} />
        </View>
        <View style={[styles.filterWrapper, { zIndex: -1 }]}>
          <ButtonIcon
            variant={iconPickerImportantFilter(importantFilterMode)}
            size={globalStyles.ICON_SM_SIZE}
          />
          <Selector style={styles.selector} data={importanceFilterData} />
        </View>
      </Animated.View>
    </>
  );
};
