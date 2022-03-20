import React, { VFC } from 'react';
import { Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import todosSelectors from '~store/todo/todo.selectors';
import styles from './list-filter.style';
import { ListFilterCompletence } from './components/list-filter-completence';
import { ListFilterPriority } from './components/list-filter-priority';

export const ListFilter: VFC<Props> = ({ scaleAndOpacity, height }) => {
  const dispatch = useDispatch();
  const page = useSelector(todosSelectors.page);
  const completenceFilterMode = useSelector(todosSelectors.completenceFilterMode);
  const priorityFilterMode = useSelector(todosSelectors.priorityFilterMode);

  return (
    <Animated.View
      style={[
        styles.selectorsWrapper,
        {
          opacity: scaleAndOpacity,
          height,
        },
      ]}
    >
      <ListFilterCompletence
        page={page}
        completenceFilterMode={completenceFilterMode}
        dispatch={dispatch}
        wrapperHeight={height}
      />
      <ListFilterPriority
        page={page}
        priorityFilterMode={priorityFilterMode}
        dispatch={dispatch}
        wrapperHeight={height}
      />
    </Animated.View>
  );
};

type Props = {
  scaleAndOpacity: Animated.Value;
  height: Animated.Value;
};
