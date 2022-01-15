import React, { useCallback, VFC } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { actions as todosActions } from '~store/todo/todo.actions';
import { SortTypes, TodosColumns } from '~types/todo.types';
import todosSelectors from '~store/todo/todo.selectors';

import styles from './list-header.style';

export const ListHeader: VFC = () => {
  const dispatch = useDispatch();
  const filterMode = useSelector(todosSelectors.filterMode);
  const isMultipleEditing = useSelector(todosSelectors.editingTodos).length > 1;

  const iconPicker = useCallback(
    (columnType: TodosColumns): 'sort' | 'sort-asc' | 'sort-desc' => {
      switch (columnType) {
        case TodosColumns.ID:
          switch (filterMode) {
            case SortTypes.ID_ASC:
              return 'sort-asc';
            case SortTypes.ID_DESC:
              return 'sort-desc';
            default:
              return 'sort';
          }
        case TodosColumns.NAME:
          switch (filterMode) {
            case SortTypes.NAME_ASC:
              return 'sort-asc';
            case SortTypes.NAME_DESC:
              return 'sort-desc';
            default:
              return 'sort';
          }
        case TodosColumns.STATUS:
          switch (filterMode) {
            case SortTypes.STATUS_ASC:
              return 'sort-asc';
            case SortTypes.STATUS_DESC:
              return 'sort-desc';
            default:
              return 'sort';
          }
        case TodosColumns.SELECT:
          switch (filterMode) {
            case SortTypes.SELECT_ASC:
              return 'sort-asc';
            case SortTypes.SELECT_DESC:
              return 'sort-desc';
            default:
              return 'sort';
          }
        default:
          return 'sort';
      }
    },
    [filterMode],
  );

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={() => dispatch(todosActions.todoSort(TodosColumns.ID))}>
        <View style={styles.id}>
          <FontAwesome name={iconPicker(TodosColumns.ID)} size={20} color="black" />
          <Text style={styles.headerText}> ID</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => dispatch(todosActions.todoSort(TodosColumns.NAME))}>
        <View style={styles.text}>
          <FontAwesome name={iconPicker(TodosColumns.NAME)} size={20} color="black" />
          <Text style={styles.headerText}> Name</Text>
        </View>
      </TouchableWithoutFeedback>
      {isMultipleEditing ? (
        <TouchableWithoutFeedback
          onPress={() => dispatch(todosActions.todoSort(TodosColumns.SELECT))}
        >
          <View style={styles.complete}>
            <FontAwesome name={iconPicker(TodosColumns.SELECT)} size={20} color="black" />
            <Text style={styles.headerText}> Selected</Text>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => dispatch(todosActions.todoSort(TodosColumns.STATUS))}
        >
          <View style={styles.complete}>
            <FontAwesome name={iconPicker(TodosColumns.STATUS)} size={20} color="black" />
            <Text style={styles.headerText}> Status</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};
