import { StyleSheet } from 'react-native';

import globalStyle from '~global/constants.style';

const styles = StyleSheet.create({
  text: {
    fontSize: globalStyle.ALERT_FS,
  },
  wrapper: {
    backgroundColor: globalStyle.SUCCESS_ALERT_BG,
    top: 50,
  },
  isShown: {
    display: 'flex',
  },
  isHidden: {
    display: 'none',
  },
});

export default styles;
