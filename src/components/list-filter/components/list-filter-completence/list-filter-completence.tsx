import React, { VFC } from 'react';
import { View } from 'react-native';
import { Dispatch } from '@reduxjs/toolkit';

import { ButtonIcon } from '~components/common/button-icon';
import { Selector } from '~components/common/selector';
import { getCompletenceFilterData } from '~components/list-filter/utils/getCompletenceFilterData';
import { iconPickerCompleteFilter } from '~utils/iconPickerCompleteFilter';
import globalStyles from '~global/constants.style';
import { CompletenceFilter } from '~types/todo.types';
import styles from './list-filter-completence.style';

export const ListFilterCompletence: VFC<Props> = ({ completenceFilterMode, page, dispatch }) => {
  return (
    <View style={styles.filterWrapper}>
      <ButtonIcon
        variant={iconPickerCompleteFilter(completenceFilterMode)}
        size={globalStyles.ICON_SM_SIZE}
        style={styles.selectorIcon}
      />
      <Selector optionsArray={getCompletenceFilterData(page, dispatch)} />
    </View>
  );
};

type Props = {
  completenceFilterMode: CompletenceFilter;
  page: number;
  dispatch: Dispatch<any>;
};
