import React, { useContext, VFC } from 'react';
import { View } from 'react-native';

import { LinearSVG } from '~components/common/svg/linear-svg';
import { BlueText } from '~components/common/text';
import { ThemeContext } from '~contexts';
import globalStyles from '~global/constants.style';
import { ImportantEnum } from '~types/todo.types';
import { getPriorityColor } from '../../utils/getPriorityColor';
import styles from './list-item-id.style';

export const ListItemId: VFC<Props> = ({ priorityType, id, isShown }) => {
  const theme = useContext(ThemeContext);
  return (
    <>
      {isShown && (
        <View style={styles.id}>
          <View style={styles.idTextWrapper}>
            <View style={styles.idText}>
              <BlueText fs={globalStyles.MAIN_FS}>{`${id}.`}</BlueText>
            </View>
            <LinearSVG
              height="100%"
              color1={priorityType ? getPriorityColor(priorityType) : theme.listItemBG}
              color2={theme.listItemBG}
            />
          </View>
        </View>
      )}
    </>
  );
};

type Props = {
  priorityType: ImportantEnum;
  id: number;
  isShown: boolean;
};
