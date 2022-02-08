import React, { VFC } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Dispatch } from '@reduxjs/toolkit';
import { TouchableWithoutFeedback, View, Text } from 'react-native';

import { iconPicker } from '~components/list-header/utils/iconPicker';
import { sortByName } from '~components/list-header/utils/sortByName';
import globalStyles from '~global/constants.style';
import { SortTypes, TodosColumns } from '~types/todo.types';
import styles from './list-header-name.style';

export const ListHeaderName: VFC<Props> = ({ isEditingMode, filterMode, dispatch }) => {
  return (
    <TouchableWithoutFeedback onPress={sortByName(isEditingMode, dispatch)} testID="name-filter">
      <View style={styles.text}>
        {!isEditingMode && (
          <FontAwesome
            name={iconPicker(TodosColumns.NAME, filterMode)}
            size={globalStyles.HEADER_ICON_SIZE}
            color={globalStyles.ICON_DEF_COLOR}
          />
        )}
        <Text style={styles.headerText}> Name</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

type Props = {
  isEditingMode: boolean;
  dispatch: Dispatch<any>;
  filterMode: SortTypes;
};
