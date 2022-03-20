import React, { useContext, VFC } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import todosSelectors from '~store/todo/todo.selectors';
import { ThemeContext } from '~contexts';
import styles from './list-header.style';
import { setFilterByCompletenceMode } from './utils/isFilteredByCompletence';
import { setIsMultipleEditingMode } from './utils/setIsMultipleEditingMode';
import { ListHeaderId } from './components/list-header-id';
import { ListHeaderName } from './components/list-header-name';
import { ListHeaderSelected } from './components/list-header-selected/list-header-selected';
import { ListHeaderStatus } from './components/list-header-status';

export const ListHeader: VFC = () => {
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
  const filterMode = useSelector(todosSelectors.filterMode);
  const isEditingMode = useSelector(todosSelectors.editingMode);
  const editingTodos = useSelector(todosSelectors.editingTodos);
  const completenceFilterMode = useSelector(todosSelectors.completenceFilterMode);
  const isFilteredByCompletence = setFilterByCompletenceMode(completenceFilterMode);
  const isMultipleEditing = setIsMultipleEditingMode(editingTodos, isEditingMode);

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.listItemBG }]}>
      <ListHeaderId isEditingMode={isEditingMode} filterMode={filterMode} dispatch={dispatch} />
      <ListHeaderName isEditingMode={isEditingMode} filterMode={filterMode} dispatch={dispatch} />
      {isMultipleEditing ? (
        <ListHeaderSelected filterMode={filterMode} dispatch={dispatch} />
      ) : (
        <ListHeaderStatus
          isEditingMode={isEditingMode}
          isFilteredByCompletence={isFilteredByCompletence}
          filterMode={filterMode}
          dispatch={dispatch}
        />
      )}
    </View>
  );
};
