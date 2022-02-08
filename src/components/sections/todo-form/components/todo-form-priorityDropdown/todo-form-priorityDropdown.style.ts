import { StyleSheet } from 'react-native';

import globalStyles from '~global/constants.style';

const styles = StyleSheet.create({
  priorityDropdown: {
    position: 'absolute',
    width: '100%',
    top: '100%',
    display: 'flex',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: globalStyles.LIGHT_BORDER_COLOR,
  },
});

export default styles;
