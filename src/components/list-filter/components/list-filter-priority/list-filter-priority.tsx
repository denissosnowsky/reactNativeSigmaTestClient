import React, { useEffect, useState, VFC } from 'react';
import { Animated, View } from 'react-native';
import { Dispatch } from '@reduxjs/toolkit';

import globalStyles from '~global/constants.style';
import { ButtonIcon } from '~components/common/button-icon';
import { getPriorityFilterData } from '~components/list-filter/utils/getImportanceFilterData';
import { iconPickerImportantFilter } from '~utils/iconPickerImportantFilter';
import { ImportantEnum } from '~types/todo.types';
import { Selector } from '~components/common/selector';
import styles from './list-filter-priority.style';

export const ListFilterPriority: VFC<Props> = ({
  priorityFilterMode,
  page,
  wrapperHeight,
  dispatch,
}) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const aniamtionId = wrapperHeight.addListener((v) => {
      if (v.value <= 0) {
        setIsShown(false);
      }
      if (v.value > 0) {
        setIsShown(true);
      }
    });
    return () => wrapperHeight.removeListener(aniamtionId);
  });

  return (
    <View style={[styles.filterWrapper, { zIndex: -1, elevation: -1 }]}>
      {isShown && (
        <>
          <ButtonIcon
            variant={iconPickerImportantFilter(priorityFilterMode)}
            size={globalStyles.ICON_SM_SIZE}
            style={styles.selectorIcon}
          />
          <Selector optionsArray={getPriorityFilterData(page, dispatch)} />
        </>
      )}
    </View>
  );
};

type Props = {
  priorityFilterMode: ImportantEnum;
  page: number;
  wrapperHeight: Animated.Value;
  dispatch: Dispatch<any>;
};
