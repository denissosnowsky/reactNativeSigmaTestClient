import React, { useEffect, useState, VFC } from 'react';
import { Animated, View } from 'react-native';
import { Dispatch } from '@reduxjs/toolkit';

import { ButtonIcon } from '~components/common/button-icon';
import { Selector } from '~components/common/selector';
import { getCompletenceFilterData } from '~components/list-filter/utils/getCompletenceFilterData';
import { iconPickerCompleteFilter } from '~utils/iconPickerCompleteFilter';
import globalStyles from '~global/constants.style';
import { CompletenceFilter } from '~types/todo.types';
import styles from './list-filter-completence.style';

export const ListFilterCompletence: VFC<Props> = ({
  completenceFilterMode,
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
    <View style={styles.filterWrapper}>
      {isShown && (
        <>
          <ButtonIcon
            variant={iconPickerCompleteFilter(completenceFilterMode)}
            size={globalStyles.ICON_SM_SIZE}
            style={styles.selectorIcon}
          />
          <Selector optionsArray={getCompletenceFilterData(page, dispatch)} />
        </>
      )}
    </View>
  );
};

type Props = {
  completenceFilterMode: CompletenceFilter;
  page: number;
  wrapperHeight: Animated.Value;
  dispatch: Dispatch<any>;
};
