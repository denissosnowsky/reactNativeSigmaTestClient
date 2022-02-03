import React, { VFC } from 'react';
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
import styles from './list-filter.style';

export const ListFilter: VFC<Props> = ({ scaleAndOpacity, height }) => {
  const completenceFilterMode = useSelector(todosSelectors.completenceFilterMode);
  const importantFilterMode = useSelector(todosSelectors.importantFilterMode);
  const page = useSelector(todosSelectors.page);
  const dispatch = useDispatch();
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

  return (
    <>
      <Animated.View
        style={[
          styles.selectorsWrapper,
          {
            transform: [{ scale: 1 }],
            opacity: scaleAndOpacity,
            height,
          },
        ]}
      >
        <View style={styles.filterWrapper}>
          <ButtonIcon
            variant={iconPickerCompleteFilter(completenceFilterMode)}
            size={globalStyles.ICON_SM_SIZE}
            style={styles.selectorIcon}
          />
          <Selector data={completenceFilterData} />
        </View>
        <View style={[styles.filterWrapper, { zIndex: -1 }]}>
          <ButtonIcon
            variant={iconPickerImportantFilter(importantFilterMode)}
            size={globalStyles.ICON_SM_SIZE}
            style={styles.selectorIcon}
          />
          <Selector data={importanceFilterData} />
        </View>
      </Animated.View>
    </>
  );
};

type Props = {
  scaleAndOpacity: Animated.Value;
  height: Animated.Value;
};
