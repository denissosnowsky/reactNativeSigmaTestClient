import React, { VFC } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Dispatch } from '@reduxjs/toolkit';
import { TouchableWithoutFeedback, View, Text } from 'react-native';

import { iconPicker } from '~components/list-header/utils/iconPicker';
import { sortBySelected } from '~components/list-header/utils/sortBySelected';
import globalStyles from '~global/constants.style';
import { SortTypes, TodosColumns } from '~types/todo.types';
import styles from './list-header-selected.style';

export const ListHeaderSelected: VFC<Props> = ({ dispatch, filterMode }) => {
  return (
    <TouchableWithoutFeedback onPress={sortBySelected(dispatch)} testID="select-filter">
      <View style={styles.complete}>
        <FontAwesome
          name={iconPicker(TodosColumns.SELECT, filterMode)}
          size={globalStyles.HEADER_ICON_SIZE}
          color={globalStyles.ICON_DEF_COLOR}
        />
        <Text style={styles.headerText}> Selected</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

type Props = {
  dispatch: Dispatch<any>;
  filterMode: SortTypes;
};
