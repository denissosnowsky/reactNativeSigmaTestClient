import React, { VFC } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Dispatch } from '@reduxjs/toolkit';
import { TouchableWithoutFeedback, View, Text } from 'react-native';

import { iconPicker } from '~components/list-header/utils/iconPicker';
import { sortById } from '~components/list-header/utils/sortById';
import globalStyles from '~global/constants.style';
import { SortTypes, TodosColumns } from '~types/todo.types';
import styles from './list-header-id.style';

export const ListHeaderId: VFC<Props> = ({ isEditingMode, filterMode, dispatch }) => {
  return (
    <TouchableWithoutFeedback onPress={sortById(isEditingMode, dispatch)} testID="id-filter">
      <View style={styles.id}>
        {!isEditingMode && (
          <FontAwesome
            name={iconPicker(TodosColumns.ID, filterMode)}
            size={globalStyles.HEADER_ICON_SIZE}
            color={globalStyles.ICON_DEF_COLOR}
          />
        )}
        <Text style={styles.headerText}> ID</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

type Props = {
  isEditingMode: boolean;
  dispatch: Dispatch<any>;
  filterMode: SortTypes;
};
