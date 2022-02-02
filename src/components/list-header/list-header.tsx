import React, { useContext, VFC } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import { todoActions } from '~store/todo';
import { CompletenceFilter, TodosColumns } from '~types/todo.types';
import todosSelectors from '~store/todo/todo.selectors';
import globalStyles from '~global/constants.style';
import { ThemeContext } from '~contexts';
import { dispatchSelection } from '~utils/dispatchSelection';
import styles from './list-header.style';
import { iconPicker } from './utils/iconPicker';

export const ListHeader: VFC = () => {
  const dispatch = useDispatch();
  const filterMode = useSelector(todosSelectors.filterMode);
  const editingMode = useSelector(todosSelectors.editingMode);
  const editingTodos = useSelector(todosSelectors.editingTodos);
  const completenceFilterMode = useSelector(todosSelectors.completenceFilterMode);
  const isFilteredByCompletence =
    completenceFilterMode === CompletenceFilter.COMPLETED ||
    completenceFilterMode === CompletenceFilter.UNCOMPLETED;
  const isMultipleEditing = editingTodos.length > 1 && editingMode;
  const theme = useContext(ThemeContext);

  const sortById = () => {
    if (!editingMode) {
      dispatchSelection(dispatch, todoActions.todoSortRequested(TodosColumns.ID))();
    }
  };
  const sortByName = () => {
    if (!editingMode) {
      dispatchSelection(dispatch, todoActions.todoSortRequested(TodosColumns.NAME))();
    }
  };
  const sortByStatus = () => {
    if (!editingMode && !isFilteredByCompletence) {
      dispatchSelection(dispatch, todoActions.todoSortRequested(TodosColumns.STATUS))();
    }
  };
  const sortBySelected = () => {
    dispatchSelection(dispatch, todoActions.todoSortRequested(TodosColumns.SELECT))();
  };

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.listItemBG }]}>
      <TouchableWithoutFeedback onPress={sortById} testID="id-filter">
        <View style={styles.id}>
          {!editingMode && (
            <FontAwesome
              name={iconPicker(TodosColumns.ID, filterMode)}
              size={globalStyles.HEADER_ICON_SIZE}
              color={globalStyles.ICON_DEF_COLOR}
            />
          )}
          <Text style={styles.headerText}> ID</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={sortByName} testID="name-filter">
        <View style={styles.text}>
          {!editingMode && (
            <FontAwesome
              name={iconPicker(TodosColumns.NAME, filterMode)}
              size={globalStyles.HEADER_ICON_SIZE}
              color={globalStyles.ICON_DEF_COLOR}
            />
          )}
          <Text style={styles.headerText}> Name</Text>
        </View>
      </TouchableWithoutFeedback>
      {isMultipleEditing ? (
        <TouchableWithoutFeedback onPress={sortBySelected} testID="select-filter">
          <View style={styles.complete}>
            <FontAwesome
              name={iconPicker(TodosColumns.SELECT, filterMode)}
              size={globalStyles.HEADER_ICON_SIZE}
              color={globalStyles.ICON_DEF_COLOR}
            />
            <Text style={styles.headerText}> Selected</Text>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback onPress={sortByStatus} testID="status-filter">
          <View style={styles.complete}>
            {!editingMode && !isFilteredByCompletence && (
              <FontAwesome
                name={iconPicker(TodosColumns.STATUS, filterMode)}
                size={globalStyles.HEADER_ICON_SIZE}
                color={globalStyles.ICON_DEF_COLOR}
              />
            )}
            <Text
              style={[
                styles.headerText,
                {
                  color: isFilteredByCompletence
                    ? globalStyles.LIGHT_CANCEL_COLOR
                    : globalStyles.DARK_CANCEL_COLOR,
                },
              ]}
            >
              {' '}
              Status
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};
