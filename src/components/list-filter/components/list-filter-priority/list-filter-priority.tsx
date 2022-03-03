import React, { VFC } from 'react';
import { View } from 'react-native';
import { Dispatch } from '@reduxjs/toolkit';

import globalStyles from '~global/constants.style';
import { ButtonIcon } from '~components/common/button-icon';
import { getPriorityFilterData } from '~components/list-filter/utils/getImportanceFilterData';
import { iconPickerImportantFilter } from '~utils/iconPickerImportantFilter';
import { ImportantEnum } from '~types/todo.types';
import { Selector } from '~components/common/selector';
import styles from './list-filter-priority.style';

export const ListFilterPriority: VFC<Props> = ({ priorityFilterMode, page, dispatch }) => {
  return (
    <View style={[styles.filterWrapper, { zIndex: -1, elevation: -1 }]}>
      <ButtonIcon
        variant={iconPickerImportantFilter(priorityFilterMode)}
        size={globalStyles.ICON_SM_SIZE}
        style={styles.selectorIcon}
      />
      {/* <Selector optionsArray={getPriorityFilterData(page, dispatch)} /> */}
    </View>
  );
};

type Props = {
  priorityFilterMode: ImportantEnum;
  page: number;
  dispatch: Dispatch<any>;
};
