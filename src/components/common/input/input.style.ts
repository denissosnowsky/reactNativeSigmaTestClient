import { StyleSheet } from 'react-native';

import globalStyles from '~global/constants.style';

const styles = StyleSheet.create({
  input: {
    fontSize: globalStyles.MAIN_FS,
    width: '100%',
    height: 40,
    color: globalStyles.MAIN_COLOR,
    borderColor: 'transparent',
  },
});

export default styles;
