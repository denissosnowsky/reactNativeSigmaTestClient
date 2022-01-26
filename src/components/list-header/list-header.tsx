import React, { VFC } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import { todoActions } from '~store/todo';
import { TodosColumns } from '~types/todo.types';
import todosSelectors from '~store/todo/todo.selectors';
import globalStyles from '~global/constants.style';
import { dispatchSelection } from '~utils/dispatchSelection';
import styles from './list-header.style';
import { iconPicker } from './utils/iconPicker';

export const ListHeader: VFC = () => {
  const dispatch = useDispatch();
  const filterMode = useSelector(todosSelectors.filterMode);
  const editingMode = useSelector(todosSelectors.editingMode);
  const editingTodos = useSelector(todosSelectors.editingTodos);
  const isMultipleEditing = editingTodos.length > 1 && editingMode;

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback
        onPress={dispatchSelection(dispatch, todoActions.todoSortRequested(TodosColumns.ID))}
        testID="id-filter"
      >
        <View style={styles.id}>
          <FontAwesome
            name={iconPicker(TodosColumns.ID, filterMode)}
            size={globalStyles.HEADER_ICON_SIZE}
            color={globalStyles.ICON_DEF_COLOR}
          />
          <Text style={styles.headerText}> ID</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={dispatchSelection(dispatch, todoActions.todoSortRequested(TodosColumns.NAME))}
        testID="name-filter"
      >
        <View style={styles.text}>
          <FontAwesome
            name={iconPicker(TodosColumns.NAME, filterMode)}
            size={globalStyles.HEADER_ICON_SIZE}
            color={globalStyles.ICON_DEF_COLOR}
          />
          <Text style={styles.headerText}> Name</Text>
        </View>
      </TouchableWithoutFeedback>
      {isMultipleEditing ? (
        <TouchableWithoutFeedback
          onPress={dispatchSelection(dispatch, todoActions.todoSortRequested(TodosColumns.SELECT))}
          testID="select-filter"
        >
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
        <TouchableWithoutFeedback
          onPress={dispatchSelection(dispatch, todoActions.todoSortRequested(TodosColumns.STATUS))}
          testID="status-filter"
        >
          <View style={styles.complete}>
            <FontAwesome
              name={iconPicker(TodosColumns.STATUS, filterMode)}
              size={globalStyles.HEADER_ICON_SIZE}
              color={globalStyles.ICON_DEF_COLOR}
            />
            <Text style={styles.headerText}> Status</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};
