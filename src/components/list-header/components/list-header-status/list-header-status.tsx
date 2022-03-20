import React, { VFC } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Dispatch } from '@reduxjs/toolkit';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

import { iconPicker } from '~components/list-header/utils/iconPicker';
import { sortByStatus } from '~components/list-header/utils/sortByStatus';
import globalStyles from '~global/constants.style';
import { SortTypes, TodosColumns } from '~types/todo.types';
import { chooseFromTwoOptionsByFlag } from '~utils/chooseFromTwoOptionsByFlag';
import styles from './list-header-status.style';

export const ListHeaderStatus: VFC<Props> = ({
  isEditingMode,
  isFilteredByCompletence,
  filterMode,
  dispatch,
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={sortByStatus(isEditingMode, isFilteredByCompletence, dispatch)}
      testID="status-filter"
    >
      <View style={styles.complete}>
        {!isEditingMode && !isFilteredByCompletence && (
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
              color: chooseFromTwoOptionsByFlag(
                isFilteredByCompletence,
                globalStyles.LIGHT_CANCEL_COLOR,
                globalStyles.DARK_CANCEL_COLOR,
              ),
            },
          ]}
        >
          {' '}
          Status
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

type Props = {
  isEditingMode: boolean;
  isFilteredByCompletence: boolean;
  filterMode: SortTypes;
  dispatch: Dispatch<any>;
};
